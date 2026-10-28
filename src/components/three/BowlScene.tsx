import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { dishes } from "@/lib/dishes";
import { showcaseState } from "@/lib/scroll-state";

const bowlVert = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 c = texture2D(uMap, uv);
    float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    vec2 d = uv - vec2(0.5, 0.6);
    float dome = (1.0 - smoothstep(0.0, 0.5, length(d))) * c.a;
    vec3 p = position;
    p.z += dome * 0.12 + lum * 0.06 * c.a;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const bowlFrag = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uHover;
  uniform float uOpacity;
  uniform vec3 uGlow;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    // soup surface region (upper ellipse of the bowl)
    vec2 s = (uv - vec2(0.5, 0.58)) / vec2(0.43, 0.3);
    float surface = 1.0 - smoothstep(0.75, 1.0, length(s));
    float dist = length(s);
    float wave = sin(dist * 22.0 - uTime * 3.0) * 0.0025 + sin(uv.x * 30.0 + uTime * 1.7) * 0.0012;
    uv += normalize(s + 0.0001) * wave * surface * (0.25 + uHover);
    vec4 c = texture2D(uMap, uv);
    if (c.a < 0.08) discard;
    float rim = 1.0 - smoothstep(0.0, 0.7, length(vUv - vec2(0.5, 0.55)));
    vec3 col = c.rgb * (1.0 + uHover * 0.12) + uGlow * uHover * rim * 0.22;
    gl_FragColor = vec4(col, c.a * uOpacity);
  }
`;

const ease = (k: number, dt: number) => 1 - Math.exp(-k * dt);

function Bowl({
  index,
  image,
  mobile,
}: {
  index: number;
  image: string;
  mobile: boolean;
}) {
  const tex = useTexture(image);
  tex.colorSpace = THREE.SRGBColorSpace;
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const hoverTarget = useRef(0);
  const hover = useRef(0);
  const uniforms = useMemo(
    () => ({
      uMap: { value: tex },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uOpacity: { value: 1 },
      uGlow: { value: new THREE.Color("#f2a33a") },
    }),
    [tex],
  );

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const local = showcaseState.progress - index;
    const g = group.current!;
    let y = 0,
      z = 0,
      rz = 0,
      s = 1;
    if (local < 0) {
      y = local * 3;
      z = -local * 1.5;
      rz = local * 0.5;
      s = 1 + local * -0.25;
    } else {
      y = local * 2.2;
      z = -local * 3;
      rz = local * -0.3;
      s = 1 - local * 0.2;
    }
    const op = THREE.MathUtils.clamp(1 - Math.abs(local) * 1.4, 0, 1);
    g.position.set(0, y, z);
    g.rotation.z = rz;
    g.scale.setScalar(s);
    g.visible = op > 0.01;

    hover.current +=
      (hoverTarget.current * (op > 0.5 ? 1 : 0) - hover.current) * ease(5, dt);
    uniforms.uTime.value += dt;
    uniforms.uHover.value = hover.current;
    uniforms.uOpacity.value = op;

    if (tilt.current) {
      const k = mobile ? 0 : 0.35 + hover.current * 0.25;
      const t = tilt.current;
      t.rotation.x +=
        (-state.pointer.y * k - 0.15 - t.rotation.x) * ease(4, dt);
      t.rotation.y += (state.pointer.x * k - t.rotation.y) * ease(4, dt);
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, -1.25, -0.2]} rotation-x={-Math.PI / 2.4}>
        <planeGeometry args={[3.4, 1.6]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={uniforms}
          vertexShader={`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `}
          fragmentShader={`uniform float uOpacity; varying vec2 vUv; void main(){ float d=length((vUv-0.5)*vec2(1.0,1.6)); float a=smoothstep(0.5,0.0,d); gl_FragColor=vec4(0.0,0.0,0.0,a*0.75*uOpacity);} `}
        />
      </mesh>
      <group ref={tilt}>
        <mesh
          onPointerOver={() => {
            hoverTarget.current = 1;
          }}
          onPointerOut={() => {
            hoverTarget.current = 0;
          }}
        >
          <planeGeometry args={[3, 3, mobile ? 32 : 96, mobile ? 32 : 96]} />
          <shaderMaterial
            vertexShader={bowlVert}
            fragmentShader={bowlFrag}
            uniforms={uniforms}
            transparent
          />
        </mesh>
      </group>
    </group>
  );
}

export default function BowlScene({ mobile }: { mobile: boolean }) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.3, 7], fov: 40 }}
      gl={{ antialias: !mobile, alpha: true }}
    >
      <Suspense fallback={null}>
        {dishes.map((d, i) => (
          <Bowl key={d.id} index={i} image={d.image} mobile={mobile} />
        ))}
      </Suspense>
    </Canvas>
  );
}
