import { useEffect, useRef, useState } from "react";
import steamWebm from "@/assets/steam/steam.webm";
import steamWebp from "@/assets/steam/steam-fallback.webp";
import steamPoster from "@/assets/steam/steam-poster.webp";
import { cn } from "@/lib/utils";

type SteamMode = "poster" | "video" | "image";

let alphaSupport: Promise<boolean> | null = null;

/**
 * Detect whether this browser decodes the alpha channel of a VP9 WebM.
 * Safari can claim VP9 support while compositing the alpha plane as opaque,
 * which would put a black rectangle over the food. We draw the first frame
 * into a canvas and inspect a known-transparent corner instead of guessing.
 */
function supportsAlphaWebm(): Promise<boolean> {
  if (alphaSupport) return alphaSupport;

  alphaSupport = new Promise<boolean>((resolve) => {
    if (typeof document === "undefined") {
      resolve(false);
      return;
    }

    const probe = document.createElement("video");
    let settled = false;

    const finish = (supported: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      probe.removeAttribute("src");
      probe.load();
      probe.remove();
      resolve(supported);
    };

    const timer = window.setTimeout(() => finish(false), 6000);

    if (!probe.canPlayType('video/webm; codecs="vp9"')) {
      finish(false);
      return;
    }

    probe.muted = true;
    probe.playsInline = true;
    probe.preload = "auto";
    // Keep the probe in the document (invisible): detached media can be
    // deprioritised by the browser and delay the first animation frame.
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.appendChild(probe);

    probe.addEventListener(
      "loadeddata",
      () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 2;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            finish(false);
            return;
          }
          ctx.clearRect(0, 0, 2, 2);
          ctx.drawImage(probe, 0, 0, 2, 2);
          // the top-left corner of every steam frame is fully transparent
          finish(ctx.getImageData(0, 0, 1, 1).data[3] < 128);
        } catch {
          finish(false);
        }
      },
      { once: true },
    );
    probe.addEventListener("error", () => finish(false), { once: true });

    probe.src = steamWebm;
    probe.load();
  });

  return alphaSupport;
}

type SteamProps = {
  className?: string;
  /** 0..1 — used to fade the plume during bowl transitions. */
  intensity?: number;
  style?: React.CSSProperties;
};

/**
 * A single, reusable hot-steam layer.
 *
 * The parent controls position and size; this component owns playback quality,
 * off-screen pausing, reduced-motion handling and the compatibility fallback.
 */
export function Steam({ className, intensity = 1, style }: SteamProps) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<SteamMode>("poster");
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const visible = inView && pageVisible;
  const active = visible && intensity > 0.04;
  const activeMode: SteamMode = reducedMotion ? "poster" : mode;

  // follow the OS reduced-motion preference live
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // choose the best format once the client can actually test it
  useEffect(() => {
    if (reducedMotion || !inView) return;
    let cancelled = false;
    void supportsAlphaWebm().then((supported) => {
      if (!cancelled) setMode(supported ? "video" : "image");
    });
    return () => {
      cancelled = true;
    };
  }, [reducedMotion, inView]);

  // pause everything when the bowl leaves the viewport or the tab is hidden
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin: "160px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active) {
      void el.play().catch(() => {
        /* autoplay may still be blocked; the poster remains visible */
      });
    } else {
      el.pause();
    }
  }, [active, activeMode]);

  const fallbackToImage = () => {
    setReady(false);
    setMode("image");
  };

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      style={{ opacity: intensity, transition: "opacity 500ms ease", ...style }}
    >
      {/* Static frame: instant paint, loading state and reduced-motion still. */}
      <img
        src={steamPoster}
        alt=""
        draggable={false}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
          activeMode !== "poster" && ready ? "opacity-0" : "opacity-100",
        )}
      />

      {activeMode === "video" && (
        <video
          ref={video}
          src={steamWebm}
          poster={steamPoster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          draggable={false}
          onCanPlay={() => setReady(true)}
          onError={fallbackToImage}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {activeMode === "image" && (
        <img
          key={visible ? "animated" : "still"}
          src={visible ? steamWebp : steamPoster}
          alt=""
          draggable={false}
          onLoad={() => setReady(true)}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
