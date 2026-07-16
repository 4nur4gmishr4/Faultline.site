import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import gsap from 'gsap'
import {
  createLaptopMaterials,
  MODEL_URL_LOCAL,
  SCREEN_SIZE,
} from './materials'

RectAreaLightUniformsLib.init()

/**
 * Lid hinge math (this model):
 * - Closed flat against base: +90° (π/2)
 * - Open 95° from closed toward upright: π/2 − 95°
 */
export const LID_OPEN_DEGREES = 95
const LID_CLOSED = Math.PI / 2
const LID_OPEN = LID_CLOSED - (LID_OPEN_DEGREES * Math.PI) / 180

/**
 * Product framing — laptop stays fully inside the stage with breathing room.
 * Larger distance + smaller scale = no overflow of the container.
 */
const CAMERA_DISTANCE = 62
const MODEL_SCALE = 0.72
const LOOK_AT: [number, number, number] = [0, 1.6, 0]
const REST_POS = { x: 0, y: -2.4, z: 0 }
const REST_ROT = { x: 0.022 * Math.PI, y: -0.05 * Math.PI, z: 0 }

export type MacLaptopProps = {
  /** 0 = closed, 1 = fully open at 95° */
  scrollProgress?: number
  active?: boolean
  reducedMotion?: boolean
  modelUrl?: string
  compact?: boolean
}

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

function computeFitDistance(
  width: number,
  height: number,
  compact: boolean
): number {
  const aspect = width / Math.max(height, 1)
  // Pull back further so chassis never kisses the stage edges
  let dist = compact ? CAMERA_DISTANCE + 8 : CAMERA_DISTANCE
  if (aspect < 0.85) dist *= 1.18
  else if (aspect < 1.05) dist *= 1.1
  else if (aspect > 1.55) dist *= 1.02
  else dist *= 1.04
  return dist
}

function FitCamera({
  compact = false,
  onDistance,
}: {
  compact?: boolean
  onDistance: (d: number) => void
}) {
  const { camera, size } = useThree()

  useLayoutEffect(() => {
    const dist = computeFitDistance(size.width, size.height, compact)
    const cam = camera as THREE.PerspectiveCamera
    // Slightly wider FOV keeps margins when orbiting
    cam.fov = compact ? 36 : 34
    cam.near = 1
    cam.far = 400

    const target = new THREE.Vector3(...LOOK_AT)
    const offset = new THREE.Vector3().subVectors(cam.position, target)
    if (offset.lengthSq() < 0.01) {
      cam.position.set(0, 2.8, dist)
    } else {
      offset.setLength(dist)
      cam.position.copy(target.clone().add(offset))
    }
    cam.lookAt(target)
    cam.updateProjectionMatrix()
    onDistance(dist)
  }, [camera, size.width, size.height, compact, onDistance])

  return null
}

/**
 * Port of minimal-three-js-laptop-template (MIT).
 * Lid 95°. Contained fit. Rotate only. Real laptop key / metal colors.
 */
export function MacLaptop({
  scrollProgress = 1,
  active: _active = true,
  reducedMotion = false,
  modelUrl = MODEL_URL_LOCAL,
  compact = false,
}: MacLaptopProps) {
  void _active
  const gltf = useLoader(GLTFLoader, modelUrl)
  const { camera, gl } = useThree()

  const macGroup = useRef<THREE.Group>(null)
  const lidGroup = useRef<THREE.Group>(null)
  const bottomGroup = useRef<THREE.Group>(null)
  const lightHolder = useRef<THREE.Group>(null)
  const screenLight = useRef<THREE.RectAreaLight>(null)
  const smoothOpen = useRef(reducedMotion ? 1 : 0)
  const [fitDist, setFitDist] = useState(CAMERA_DISTANCE)

  const videoEl = useMemo(() => document.createElement('video'), [])
  const materials = useMemo(() => createLaptopMaterials(videoEl), [videoEl])

  const { topNodes, bottomNodes } = useMemo(() => {
    const scene = gltf.scene.clone(true)
    const top: THREE.Object3D[] = []
    const bottom: THREE.Object3D[] = []

    ;[...scene.children].forEach((child) => {
      if (child.name === '_top') {
        top.push(child)
        child.traverse((mesh) => {
          if (!(mesh instanceof THREE.Mesh)) return
          if (mesh.name === 'lid') mesh.material = materials.baseMetal
          else if (mesh.name === 'logo') mesh.material = materials.logo
          else if (mesh.name === 'screen-frame') mesh.material = materials.darkPlastic
          else if (mesh.name === 'camera') mesh.material = materials.camera
        })
      } else if (child.name === '_bottom') {
        bottom.push(child)
        child.traverse((mesh) => {
          if (!(mesh instanceof THREE.Mesh)) return
          if (mesh.name === 'base') mesh.material = materials.baseMetal
          else if (mesh.name === 'legs') mesh.material = materials.darkPlastic
          else if (mesh.name === 'keyboard') mesh.material = materials.keyboard
          else if (mesh.name === 'inner') mesh.material = materials.darkPlastic
        })
      }
    })

    return { topNodes: top, bottomNodes: bottom }
  }, [gltf.scene, materials])

  useEffect(() => {
    if (!macGroup.current || !lidGroup.current || !bottomGroup.current || !screenLight.current) {
      return
    }

    const mac = macGroup.current
    const lid = lidGroup.current
    const bottom = bottomGroup.current

    mac.scale.setScalar(MODEL_SCALE)
    mac.position.set(REST_POS.x, REST_POS.y, REST_POS.z)
    mac.rotation.set(REST_ROT.x, REST_ROT.y, REST_ROT.z)
    lid.rotation.x = LID_CLOSED
    lid.position.set(0, 0, 0)
    bottom.position.y = 0
    materials.screen.opacity = 0
    screenLight.current.intensity = 0
    smoothOpen.current = reducedMotion ? 1 : 0

    if (reducedMotion) {
      lid.rotation.x = LID_OPEN
      materials.screen.opacity = 0.98
      if (screenLight.current) screenLight.current.intensity = 1.35
      smoothOpen.current = 1
    } else {
      // One-shot product settle — no looping float / auto-spin
      gsap.fromTo(
        mac.position,
        { y: REST_POS.y - 10 },
        { y: REST_POS.y, duration: 1.2, ease: 'power3.out' }
      )
      gsap.fromTo(
        mac.rotation,
        { x: 0.16 * Math.PI, y: 0.06 * Math.PI },
        {
          x: REST_ROT.x,
          y: REST_ROT.y,
          duration: 1.35,
          ease: 'power3.out',
        }
      )
    }

    const onLost = (e: Event) => {
      e.preventDefault()
    }
    const blockZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault()
    }
    gl.domElement.addEventListener('webglcontextlost', onLost, false)
    gl.domElement.addEventListener('wheel', blockZoom, { passive: false })

    return () => {
      gl.domElement.removeEventListener('webglcontextlost', onLost)
      gl.domElement.removeEventListener('wheel', blockZoom)
    }
  }, [materials, topNodes, bottomNodes, reducedMotion, gl])

  useFrame((_, delta) => {
    if (lightHolder.current) {
      lightHolder.current.quaternion.copy(camera.quaternion)
    }

    const lid = lidGroup.current
    if (!lid) return

    const target = reducedMotion ? 1 : Math.min(1, Math.max(0, scrollProgress))
    const rate = target > smoothOpen.current ? 3.8 : 5.5
    const smooth = 1 - Math.exp(-rate * Math.min(delta, 0.05))
    smoothOpen.current += (target - smoothOpen.current) * smooth

    const eased = smoothstep(smoothOpen.current)
    lid.rotation.x = THREE.MathUtils.lerp(LID_CLOSED, LID_OPEN, eased)
    lid.position.z = THREE.MathUtils.lerp(0.28, 0, eased)

    materials.screen.opacity = THREE.MathUtils.lerp(0, 0.98, Math.min(1, eased * 1.35))
    if (screenLight.current) {
      screenLight.current.intensity = THREE.MathUtils.lerp(0, 1.35, Math.min(1, eased * 1.25))
    }
  })

  return (
    <>
      <FitCamera compact={compact} onDistance={setFitDist} />
      <color attach="background" args={['#0a0c10']} />
      <ambientLight intensity={0.32} />
      <hemisphereLight args={['#e8f0ff', '#0a0c10', 0.4]} />
      <group ref={lightHolder}>
        <pointLight color={0xfff0e8} intensity={0.8} position={[10, 14, 32]} distance={130} />
        <pointLight color={0x6cb6ff} intensity={0.22} position={[-18, 10, 20]} distance={90} />
        <directionalLight color={0xffffff} intensity={0.36} position={[-6, 20, 10]} />
        <directionalLight color={0xdfe6f0} intensity={0.14} position={[12, 4, -6]} />
      </group>

      {!reducedMotion && (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableRotate
          enableDamping
          dampingFactor={0.055}
          rotateSpeed={0.5}
          autoRotate={false}
          minDistance={fitDist}
          maxDistance={fitDist}
          minPolarAngle={Math.PI * 0.36}
          maxPolarAngle={Math.PI * 0.46}
          minAzimuthAngle={-Math.PI * 0.32}
          maxAzimuthAngle={Math.PI * 0.32}
          target={LOOK_AT}
        />
      )}

      <group ref={macGroup}>
        <group ref={lidGroup}>
          {topNodes.map((node) => (
            <primitive key={node.uuid} object={node} />
          ))}
          <mesh
            position={[0, 10.5, -0.11]}
            rotation={[Math.PI, 0, 0]}
            material={materials.screen}
          >
            <planeGeometry args={[SCREEN_SIZE[0], SCREEN_SIZE[1]]} />
          </mesh>
          <rectAreaLight
            ref={screenLight}
            width={SCREEN_SIZE[0]}
            height={SCREEN_SIZE[1]}
            intensity={0}
            color={0xffffff}
            position={[0, 10.5, 0]}
            rotation={[Math.PI, 0, 0]}
          />
          <mesh
            position={[0, 10.5, -0.111]}
            rotation={[Math.PI, Math.PI, 0]}
            material={materials.darkPlastic}
          >
            <planeGeometry args={[SCREEN_SIZE[0], SCREEN_SIZE[1]]} />
          </mesh>
        </group>

        <group ref={bottomGroup}>
          {bottomNodes.map((node) => (
            <primitive key={node.uuid} object={node} />
          ))}
        </group>
      </group>

      <ContactShadows
        position={[0, -3.9, 0]}
        opacity={0.42}
        scale={36}
        blur={2.4}
        far={14}
        color="#000000"
        resolution={512}
      />
    </>
  )
}
