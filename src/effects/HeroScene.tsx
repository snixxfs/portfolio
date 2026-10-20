import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createUniforms, heroFragmentShader, heroVertexShader } from './HeroShader'

interface HeroSceneProps {
  light?: boolean
  onReady?: () => void
}

export default function HeroScene({ light = false, onReady }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      })
    } catch (err) {
      console.warn('WebGL not available:', err)
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = createUniforms()

    const material = new THREE.ShaderMaterial({
      vertexShader: heroVertexShader,
      fragmentShader: heroFragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const pointerTarget = new THREE.Vector2(0.5, 0.5)
    let strengthTarget = 0
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      if (!renderer) return
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, light ? 1 : 1.5))
      uniforms.uResolution.value.set(width, height)
    }

    resize()

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointerTarget.set(event.clientX / width, 1 - event.clientY / height)
      strengthTarget = 1
    }

    const onPointerLeave = () => {
      strengthTarget = 0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', resize, { passive: true })

    let animId = 0
    let lastTime = performance.now()
    let readyTriggered = false
    let isVisible = true

    const renderLoop = (now: number) => {
      if (!isVisible) {
        animId = 0
        return
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      uniforms.uTime.value += dt * (light ? 0.6 : 1.0)
      uniforms.uPointer.value.lerp(pointerTarget, light ? 0.04 : 0.08)
      uniforms.uPointerStrength.value +=
        (strengthTarget - uniforms.uPointerStrength.value) * (light ? 0.05 : 0.09)

      if (renderer) {
        renderer.render(scene, camera)
      }

      if (!readyTriggered) {
        readyTriggered = true
        onReady?.()
      }

      animId = requestAnimationFrame(renderLoop)
    }

    // Pause WebGL rendering whenever the hero section is out of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        const wasVisible = isVisible
        isVisible = entry.isIntersecting
        if (isVisible && !wasVisible && !animId) {
          lastTime = performance.now()
          animId = requestAnimationFrame(renderLoop)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    animId = requestAnimationFrame(renderLoop)

    return () => {
      observer.disconnect()
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', resize)
      mesh.geometry.dispose()
      material.dispose()
      renderer?.dispose()
    }
  }, [light, onReady])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
