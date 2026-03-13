<template>
  <div ref="container" class="w-full h-full relative overflow-hidden bg-winter-card">
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full block"></canvas>
    
    <!-- UI Overlay -->
    <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none select-none">
      <div class="text-xs font-mono text-winter-blue/80 bg-winter-bg/50 px-2 py-1 rounded backdrop-blur-sm border border-winter-blue/20 w-fit">
        NEURAL_SNOW_NET: ACTIVE
      </div>
      <div class="text-[10px] text-winter-text/50 font-mono">
        MOUSE: ATTRACT | CLICK: PULSE
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const container = ref(null)
const canvas = ref(null)
let ctx = null
let animationId = null
let particles = []
let mouse = { x: null, y: null, radius: 150 }

// Configuration
const PARTICLE_COUNT = 120 // Number of nodes
const CONNECTION_DISTANCE = 100 // Max distance to draw line
const MOUSE_RADIUS = 200 // Interaction radius
const BASE_SPEED = 0.5 // Base movement speed

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * BASE_SPEED
    this.vy = (Math.random() - 0.5) * BASE_SPEED
    this.size = Math.random() * 2 + 1
    // Theme colors: Blue/Gold accents
    this.color = Math.random() > 0.9 ? '#D4AF37' : '#5B7C99' 
  }

  update(width, height) {
    // Move
    this.x += this.vx
    this.y += this.vy

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1

    // Mouse interaction
    if (mouse.x != null) {
      let dx = mouse.x - this.x
      let dy = mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (mouse.radius - distance) / mouse.radius
        const directionX = forceDirectionX * force * 3
        const directionY = forceDirectionY * force * 3
        
        this.x += directionX
        this.y += directionY
      }
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const init = () => {
  if (!canvas.value || !container.value) return
  
  ctx = canvas.value.getContext('2d')
  resize()
  
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(canvas.value.width, canvas.value.height))
  }
  
  animate()
}

const resize = () => {
  if (!container.value || !canvas.value) return
  canvas.value.width = container.value.clientWidth
  canvas.value.height = container.value.clientHeight
}

const animate = () => {
  if (!ctx) return
  animationId = requestAnimationFrame(animate)
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Update and draw particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(canvas.value.width, canvas.value.height)
    particles[i].draw()
    
    // Draw connections
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x
      let dy = particles[i].y - particles[j].y
      let distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < CONNECTION_DISTANCE) {
        ctx.beginPath()
        let opacity = 1 - (distance / CONNECTION_DISTANCE)
        ctx.strokeStyle = `rgba(91, 124, 153, ${opacity * 0.5})` // Winter Blue with opacity
        ctx.lineWidth = 1
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

const handleMouseMove = (e) => {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

const handleMouseLeave = () => {
  mouse.x = null
  mouse.y = null
}

const handleClick = () => {
  // Push particles away on click
  mouse.radius = 400
  setTimeout(() => { mouse.radius = MOUSE_RADIUS }, 300)
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
  if (container.value) {
    container.value.addEventListener('mousemove', handleMouseMove)
    container.value.addEventListener('mouseleave', handleMouseLeave)
    container.value.addEventListener('click', handleClick)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  if (container.value) {
    container.value.removeEventListener('mousemove', handleMouseMove)
    container.value.removeEventListener('mouseleave', handleMouseLeave)
    container.value.removeEventListener('click', handleClick)
  }
})
</script>