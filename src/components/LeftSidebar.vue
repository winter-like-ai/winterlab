<template>
  <div class="h-full flex flex-col gap-6 p-4 border-r border-winter-blue/10 bg-winter-dark/50 overflow-hidden relative">
    <!-- 3D Model Container -->
    <div class="h-64 w-full bg-winter-card rounded-lg border border-winter-blue/20 relative overflow-hidden group transition-colors duration-500">
      <div class="absolute inset-0 flex items-center justify-center">
        <div ref="canvasContainer" class="w-full h-full"></div>
      </div>
      <div class="absolute bottom-2 right-2 text-[10px] text-winter-blue/40 font-mono">
        MODULE: CUBE_ROT
      </div>
    </div>

    <!-- Code Rain Effect -->
    <div class="flex-1 relative rounded-lg border border-winter-blue/10 bg-winter-card overflow-hidden transition-colors duration-500">
       <canvas ref="matrixCanvas" class="absolute inset-0 w-full h-full opacity-30"></canvas>
       <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
         <span class="text-4xl font-bold text-winter-blue/10 dark:text-winter-cream/10 tracking-tighter rotate-90">SYSTEM</span>
       </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-2">
      <div class="bg-winter-card p-2 rounded border border-winter-blue/10">
        <div class="text-[10px] text-winter-brown uppercase">CPU Load</div>
        <div class="text-lg font-mono text-winter-blue">12%</div>
      </div>
      <div class="bg-winter-card p-2 rounded border border-winter-blue/10">
        <div class="text-[10px] text-winter-brown uppercase">Memory</div>
        <div class="text-lg font-mono text-winter-blue">4.2GB</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

// Theme Detection
const isDark = ref(true)
let observer

const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

// 3D Scene Setup
const canvasContainer = ref(null)
let scene, camera, renderer, cube, innerObj, animationId

const updateThreeMaterials = () => {
  if (!cube || !innerObj) return
  
  if (isDark.value) {
    // Dark Mode: Brighter/Lighter colors
    cube.material.color.setHex(0xe2e8f0) // Bright Silver/White
    innerObj.material.color.setHex(0xfcd34d) // Gold
  } else {
    // Light Mode: Darker colors for contrast against white
    cube.material.color.setHex(0x334155) // Slate 700
    innerObj.material.color.setHex(0x0ea5e9) // Sky Blue
  }
}

const initThree = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  
  renderer.setSize(width, height)
  canvasContainer.value.appendChild(renderer.domElement)

  // Create geometry with wireframe
  const geometry = new THREE.IcosahedronGeometry(1.5, 0)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xe2e8f0, 
    wireframe: true,
    transparent: true,
    opacity: 0.5
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // Inner geometry
  const innerGeo = new THREE.OctahedronGeometry(0.8, 0)
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xfcd34d,
    wireframe: false
  })
  innerObj = new THREE.Mesh(innerGeo, innerMat)
  cube.add(innerObj)

  camera.position.z = 3.5

  updateThreeMaterials() // Set initial colors

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    cube.rotation.x += 0.005
    cube.rotation.y += 0.005
    renderer.render(scene, camera)
  }
  animate()
}

// Matrix Rain Setup
const matrixCanvas = ref(null)
let matrixInterval

const initMatrix = () => {
  const canvas = matrixCanvas.value
  const ctx = canvas.getContext('2d')
  
  canvas.width = canvas.parentElement.clientWidth
  canvas.height = canvas.parentElement.clientHeight

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%'
  const fontSize = 10
  const columns = canvas.width / fontSize

  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  const draw = () => {
    // Fade effect background
    if (isDark.value) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Text color
    if (isDark.value) {
      ctx.fillStyle = '#4ade80' // Bright Green (Matrix style)
    } else {
      ctx.fillStyle = '#334155' // Slate 700
    }
    
    ctx.font = fontSize + 'px monospace'

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length))
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }
  
  matrixInterval = setInterval(draw, 33)
}

onMounted(() => {
  checkTheme()
  observer = new MutationObserver(checkTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  initThree()
  initMatrix()
  
  window.addEventListener('resize', handleResize)
})

watch(isDark, () => {
  updateThreeMaterials()
})

const handleResize = () => {
    // Resize logic for Three.js
    if (renderer && canvasContainer.value) {
        const width = canvasContainer.value.clientWidth
        const height = canvasContainer.value.clientHeight
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    }
    // Resize Matrix
    if (matrixCanvas.value) {
        matrixCanvas.value.width = matrixCanvas.value.parentElement.clientWidth
        matrixCanvas.value.height = matrixCanvas.value.parentElement.clientHeight
    }
}

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  clearInterval(matrixInterval)
  window.removeEventListener('resize', handleResize)
  if (renderer) renderer.dispose()
})
</script>
