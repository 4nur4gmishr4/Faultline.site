import * as THREE from 'three'

export const SCREEN_SIZE: [number, number] = [29.4, 20]

export interface LaptopMaterials {
  darkPlastic: THREE.MeshStandardMaterial
  camera: THREE.MeshBasicMaterial
  baseMetal: THREE.MeshStandardMaterial
  logo: THREE.MeshBasicMaterial
  screen: THREE.MeshBasicMaterial
  /** GLB model keycaps — solid black chiclet color, no overlay plane. */
  keyboard: THREE.MeshStandardMaterial
  screenImageTexture: THREE.Texture
  screenCameraTexture: THREE.VideoTexture
  videoEl: HTMLVideoElement
}

/** Procedural FaultLine terminal screen (no external stock wallpaper). */
export function createFaultLineScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#0a0c10'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#121c2a'
  ctx.fillRect(0, 0, canvas.width, 44)
  ctx.strokeStyle = 'rgba(108,182,255,0.35)'
  ctx.lineWidth = 1
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1)
  ctx.beginPath()
  ctx.moveTo(0, 44)
  ctx.lineTo(canvas.width, 44)
  ctx.stroke()

  ;[
    ['#ff6b6b', 22],
    ['#f0b429', 40],
    ['#3dd68c', 58],
  ].forEach(([c, x]) => {
    ctx.fillStyle = c as string
    ctx.beginPath()
    ctx.arc(x as number, 22, 5, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.fillStyle = '#6cb6ff'
  ctx.font = '500 15px "IBM Plex Mono", ui-monospace, monospace'
  ctx.fillText('FAULTLINE  ·  ANALYZE LAST FAILURE', 88, 27)

  const lines: { text: string; color: string; weight?: string }[] = [
    { text: '$ npm run build', color: '#6cb6ff' },
    { text: '', color: '#8b93a3' },
    { text: "error TS2304: Cannot find name 'runtime'.", color: '#ff6b6b', weight: '600' },
    { text: '  src/extension.ts:42', color: '#8b93a3' },
    { text: '', color: '#8b93a3' },
    { text: '> FAULT CAPTURED', color: '#f0b429', weight: '600' },
    { text: '> source: task', color: '#b8c0ce' },
    { text: '> label: npm run build', color: '#b8c0ce' },
    { text: '> pii: scrubbed', color: '#3dd68c' },
    { text: '', color: '#8b93a3' },
    { text: 'Explain?  [Y] open panel   [N] keep silent', color: '#d4d8e0' },
    { text: '', color: '#8b93a3' },
    { text: 'id: 4nur4gmishr4.fahh', color: '#6cb6ff' },
    { text: 'autoShow: OFF', color: '#3dd68c' },
  ]

  let y = 82
  for (const line of lines) {
    ctx.fillStyle = line.color
    ctx.font = `${line.weight ?? '400'} 17px "IBM Plex Mono", ui-monospace, monospace`
    if (line.text) ctx.fillText(line.text, 28, y)
    y += 30
  }

  ctx.fillStyle = '#6cb6ff'
  ctx.fillRect(0, canvas.height - 32, canvas.width, 32)
  ctx.fillStyle = '#0a0c10'
  ctx.font = '500 13px "IBM Plex Mono", ui-monospace, monospace'
  ctx.fillText('DEBUGGER FIRST  ·  NOTIFIER SECOND', 24, canvas.height - 11)

  const tex = new THREE.CanvasTexture(canvas)
  tex.flipY = false
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

export function createLaptopMaterials(videoEl: HTMLVideoElement): LaptopMaterials {
  const screenImageTexture = createFaultLineScreenTexture()
  screenImageTexture.wrapS = THREE.ClampToEdgeWrapping
  screenImageTexture.wrapT = THREE.ClampToEdgeWrapping

  const screenCameraTexture = new THREE.VideoTexture(videoEl)
  screenCameraTexture.flipY = false

  const screen = new THREE.MeshBasicMaterial({
    map: screenImageTexture,
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
  })

  return {
    // Palm rest / bezel / trackpad well — deep black plastic
    darkPlastic: new THREE.MeshStandardMaterial({
      color: 0x1a1a1c,
      roughness: 0.82,
      metalness: 0.12,
    }),
    // Webcam pinhole
    camera: new THREE.MeshBasicMaterial({ color: 0x0a0a0a }),
    // Space Gray aluminum unibody
    baseMetal: new THREE.MeshStandardMaterial({
      color: 0xa8a9ae,
      roughness: 0.38,
      metalness: 0.92,
      envMapIntensity: 1.05,
    }),
    // Laser-etched lid logo — soft silver
    logo: new THREE.MeshBasicMaterial({ color: 0xd8d8dc }),
    screen,
    // GLB model keycaps only — matte black chiclet plastic
    keyboard: new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.88,
      metalness: 0.04,
    }),
    screenImageTexture,
    screenCameraTexture,
    videoEl,
  }
}

/** Prefer local public model; fall back to remote CDN. */
export const MODEL_URL_LOCAL = '/models/mac-noUv.glb'
export const MODEL_URL_REMOTE = 'https://ksenia-k.com/models/mac-noUv.glb'
