"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import type { Group } from "three";

export type GrillzStyleId = "signature" | "platinum" | "diamond" | "blackgold";

export type GrillzStageProps = {
  mode: "hero" | "viewer";
  selectedStyle: GrillzStyleId;
  upperEnabled: boolean;
  lowerEnabled: boolean;
  autoRotate: boolean;
};

type MouthModelProps = Omit<GrillzStageProps, "mode"> & {
  scale: number;
};

const styleMaterials: Record<
  GrillzStyleId,
  {
    color: string;
    secondary: string;
    roughness: number;
    metalness: number;
  }
> = {
  signature: {
    color: "#d4af37",
    secondary: "#f5d678",
    roughness: 0.16,
    metalness: 1,
  },
  platinum: {
    color: "#dfe6ef",
    secondary: "#98a2b3",
    roughness: 0.12,
    metalness: 1,
  },
  diamond: {
    color: "#d4af37",
    secondary: "#fff1b5",
    roughness: 0.11,
    metalness: 1,
  },
  blackgold: {
    color: "#101010",
    secondary: "#d4af37",
    roughness: 0.22,
    metalness: 0.9,
  },
};

export function GrillzStage({
  mode,
  selectedStyle,
  upperEnabled,
  lowerEnabled,
  autoRotate,
}: GrillzStageProps) {
  const isHero = mode === "hero";

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{
        position: isHero ? [0, 0.18, 6.2] : [0, 0.1, 5.4],
        fov: isHero ? 35 : 42,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      aria-label="Interaktives 3D-Gebiss mit wechselbaren Grillz Styles"
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 7, 13]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[3.5, 4.2, 4.5]} intensity={2.8} castShadow />
      <pointLight position={[-3.2, 1.4, 3.4]} intensity={4.5} color="#d4af37" />
      <spotLight
        position={[0, 4.5, 5.5]}
        angle={0.35}
        penumbra={0.85}
        intensity={isHero ? 8 : 5.8}
        color="#ffffff"
        castShadow
      />

      <Suspense
        fallback={
          <Html center className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Feinschliff
          </Html>
        }
      >
        <Environment resolution={256}>
          <Lightformer intensity={5} position={[0, 4, -6]} scale={[8, 5, 1]} />
          <Lightformer intensity={3.2} position={[-5, 1.4, 3]} scale={[2, 4, 1]} color="#d4af37" />
          <Lightformer intensity={2.6} position={[5, 1.2, 3]} scale={[2, 4, 1]} color="#ffffff" />
          <Lightformer intensity={1.8} position={[0, -3, 4]} scale={[8, 1, 1]} color="#c9a94e" />
        </Environment>
        <Float
          speed={isHero ? 1.2 : 0.6}
          rotationIntensity={isHero ? 0.18 : 0.05}
          floatIntensity={isHero ? 0.5 : 0.15}
        >
          <MouthModel
            selectedStyle={selectedStyle}
            upperEnabled={upperEnabled}
            lowerEnabled={lowerEnabled}
            autoRotate={autoRotate}
            scale={isHero ? 1.12 : 1.04}
          />
        </Float>
        <ContactShadows
          position={[0, -1.65, 0]}
          opacity={0.35}
          scale={7}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enabled={!isHero}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.3}
        maxDistance={7.2}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}

function MouthModel({
  selectedStyle,
  upperEnabled,
  lowerEnabled,
  autoRotate,
  scale,
}: MouthModelProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={group} scale={scale} rotation={[0.06, -0.22, 0]}>
      <Arch jaw="upper" active={upperEnabled} style={selectedStyle} />
      <Arch jaw="lower" active={lowerEnabled} style={selectedStyle} />
      <mesh position={[0, -1.05, -0.16]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <torusGeometry args={[1.75, 0.035, 12, 96, Math.PI]} />
        <meshStandardMaterial color="#241415" roughness={0.58} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.05, -0.16]} rotation={[-Math.PI / 2, 0, Math.PI]} receiveShadow>
        <torusGeometry args={[1.75, 0.035, 12, 96, Math.PI]} />
        <meshStandardMaterial color="#241415" roughness={0.58} metalness={0.08} />
      </mesh>
    </group>
  );
}

function Arch({
  jaw,
  active,
  style,
}: {
  jaw: "upper" | "lower";
  active: boolean;
  style: GrillzStyleId;
}) {
  const material = styleMaterials[style];
  const isUpper = jaw === "upper";
  const teeth = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => {
        const offset = index - 4.5;
        const edge = Math.abs(offset) / 4.5;

        return {
          index,
          x: offset * 0.34,
          y: isUpper ? 0.48 - edge * 0.05 : -0.48 + edge * 0.05,
          z: -Math.abs(offset) * 0.045,
          width: 0.28 - edge * 0.035,
          height: 0.7 - edge * 0.17,
          depth: 0.34 - edge * 0.03,
          rotationZ: offset * 0.026,
        };
      }),
    [isUpper],
  );

  return (
    <group rotation={[isUpper ? -0.05 : 0.05, 0, 0]}>
      {teeth.map((tooth) => {
        const capColor =
          style === "blackgold" && tooth.index % 3 !== 1 ? material.color : material.secondary;

        return (
          <group
            key={`${jaw}-${tooth.index}`}
            position={[tooth.x, tooth.y, tooth.z]}
            rotation={[0, tooth.x * 0.04, tooth.rotationZ]}
          >
            <RoundedBox
              args={[tooth.width, tooth.height, tooth.depth]}
              radius={0.055}
              smoothness={5}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color="#f4efe5"
                roughness={0.42}
                metalness={0.02}
                envMapIntensity={0.45}
              />
            </RoundedBox>

            {active ? (
              <RoundedBox
                args={[tooth.width * 1.08, tooth.height * 0.58, tooth.depth * 1.12]}
                radius={0.045}
                smoothness={5}
                position={[
                  0,
                  isUpper ? -tooth.height * 0.1 : tooth.height * 0.1,
                  0.085,
                ]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial
                  color={capColor}
                  roughness={material.roughness}
                  metalness={material.metalness}
                  envMapIntensity={1.85}
                />
              </RoundedBox>
            ) : null}

            {active && style === "diamond" && tooth.index > 2 && tooth.index < 7 ? (
              <group position={[0, isUpper ? -0.05 : 0.05, 0.3]}>
                <mesh castShadow>
                  <octahedronGeometry args={[0.055, 0]} />
                  <meshStandardMaterial
                    color="#ffffff"
                    emissive="#cfefff"
                    emissiveIntensity={0.3}
                    roughness={0.02}
                    metalness={0.15}
                    envMapIntensity={2.4}
                  />
                </mesh>
              </group>
            ) : null}
          </group>
        );
      })}
    </group>
  );
}
