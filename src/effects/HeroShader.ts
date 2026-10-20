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
  uniform vec3  uBase;
  uniform vec3  uGold;
  uniform vec3  uCyan;
  uniform vec3  uEmerald;

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    // Fluid pointer deflection with smooth dampening
    vec2 pointer = (uPointer - 0.5) * aspect;
    float dist = length(p - pointer);
    float influence = uPointerStrength * smoothstep(0.7, 0.0, dist);
    p += normalize(p - pointer + 0.001) * influence * 0.12;

    float t = uTime * 0.35;

    // High-performance procedural luxury caustic waves (zero heavy noise loops)
    float wave1 = sin(p.x * 2.2 + p.y * 1.6 + t * 0.8);
    float wave2 = cos(p.x * 1.8 - p.y * 2.4 - t * 0.6 + wave1 * 0.5);
    float wave3 = sin(length(p * 2.0) * 2.4 - t * 0.5 + wave2 * 0.4);

    float goldIntensity = smoothstep(-0.4, 1.0, wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2);
    float rimGlow = smoothstep(0.45, 0.0, dist) * uPointerStrength;

    // Vignette for cinematic focus
    float vignette = smoothstep(1.2, 0.2, length(p * vec2(0.85, 1.15)));

    // Luxury palette blending: deep caviar base + champagne gold highlights
    vec3 color = uBase;
    color += uGold * goldIntensity * 0.38;
    color += uGold * rimGlow * 0.25;
    color += vec3(0.95, 0.85, 0.65) * pow(goldIntensity, 3.5) * 0.25; // Subtle metallic specular shimmer

    color *= mix(0.75, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`

export interface HeroUniforms {
  [key: string]: THREE.IUniform<any>
  uTime: THREE.IUniform<number>
  uResolution: THREE.IUniform<THREE.Vector2>
  uPointer: THREE.IUniform<THREE.Vector2>
  uPointerStrength: THREE.IUniform<number>
  uBase: THREE.IUniform<THREE.Color>
  uGold: THREE.IUniform<THREE.Color>
  uCyan: THREE.IUniform<THREE.Color>
  uEmerald: THREE.IUniform<THREE.Color>
}

export function createUniforms(): HeroUniforms {
  return {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerStrength: { value: 0 },
    uBase: { value: new THREE.Color(0x08090d) },
    uGold: { value: new THREE.Color(0xdfba6a) }, // Imperial Champagne Gold
    uCyan: { value: new THREE.Color(0xd4af37) },
    uEmerald: { value: new THREE.Color(0xe7cb8b) },
  }
}
