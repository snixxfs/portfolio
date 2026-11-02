import * as THREE from 'three'

export const heroVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const heroFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uPointer;
  uniform float uPointerStrength;

  // Ultra-clean, subtle luxury dark aesthetic
  // Pure deep obsidian with delicate cursor-driven ambient illumination
  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    vec2 pointer = (uPointer - 0.5) * aspect;

    float dist = length(p - pointer);

    // Subtle ambient cursor glow
    float cursorGlow = smoothstep(0.65, 0.0, dist) * uPointerStrength * 0.18;

    // Very subtle, deep space atmospheric gradient (pitch black #030305 base)
    vec3 baseColor = vec3(0.012, 0.012, 0.018);
    vec3 glowColor = vec3(0.12, 0.15, 0.28); // Minimal cool titanium blue/violet ambient
    vec3 accentGlow = vec3(0.22, 0.18, 0.10); // Delicate faint champagne gold underlight

    // Deep vignette
    float vig = smoothstep(1.3, 0.2, length(p * vec2(0.9, 1.1)));

    vec3 color = baseColor;
    color += glowColor * cursorGlow;
    color += accentGlow * (0.04 * sin(uTime * 0.2 + p.x * 2.0));
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`

export interface HeroUniforms {
  [key: string]: THREE.IUniform<any>
  uTime: THREE.IUniform<number>
  uResolution: THREE.IUniform<THREE.Vector2>
  uPointer: THREE.IUniform<THREE.Vector2>
  uPointerStrength: THREE.IUniform<number>
}

export function createUniforms(): HeroUniforms {
  return {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerStrength: { value: 0 },
  }
}
