<template>
  <div class="h-full flex flex-col gap-6 p-4 border-l border-winter-blue/10 bg-winter-dark/50">
    
    <!-- Real-time Data Panel -->
    <div class="bg-winter-card rounded-lg p-4 border border-winter-blue/10">
      <h3 class="text-xs font-bold text-winter-blue mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        LIVE_DATA_STREAM
      </h3>
      <div class="space-y-3 font-mono text-xs">
        <div class="flex justify-between text-winter-cream/70" v-for="(val, key) in serverStats" :key="key">
          <span class="uppercase">{{ key }}</span>
          <span class="text-winter-brown">{{ val }}</span>
        </div>
      </div>
      <!-- Mini Chart Placeholder -->
      <div class="h-16 mt-4 flex items-end gap-1 opacity-50">
        <div v-for="i in 10" :key="i" 
             class="bg-winter-blue w-full rounded-t-sm transition-all duration-500"
             :style="{ height: Math.random() * 100 + '%' }">
        </div>
      </div>
    </div>

    <!-- Activity Status -->
    <div class="bg-winter-card rounded-lg p-4 border border-winter-blue/10">
       <h3 class="text-xs font-bold text-winter-blue mb-3 uppercase">Current Status</h3>
       <div class="flex items-center gap-3 mb-2">
         <div class="w-10 h-10 rounded-full bg-winter-brown/20 flex items-center justify-center text-xl">
           👨‍💻
         </div>
         <div>
           <div class="text-sm font-bold text-winter-cream">Coding</div>
           <div class="text-xs text-winter-blue/60">VS Code • WinterLab</div>
         </div>
       </div>
    </div>

    <!-- Timeline -->
    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <h3 class="text-xs font-bold text-winter-blue mb-4 uppercase sticky top-0 bg-winter-dark py-2">ArXiv CS Papers</h3>
      <div class="relative border-l border-winter-blue/20 ml-2 space-y-6 pl-4">
        <div v-for="(paper, index) in timeline" :key="index" class="relative group">
          <div class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-winter-dark border border-winter-blue group-hover:bg-winter-blue transition-colors"></div>
          <div class="text-xs text-winter-brown font-mono mb-1">{{ paper.time }}</div>
          <a :href="paper.link" target="_blank" class="text-sm text-winter-cream font-medium hover:text-winter-blue transition-colors block leading-tight mb-1">
            {{ paper.title }}
          </a>
          <div class="text-xs text-winter-cream/50 mt-1 leading-relaxed">{{ paper.desc }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const serverStats = ref({
  uptime: 'Calculating...',
  requests: '14,203/min',
  latency: '24ms',
  temp: 'Loading...'
})

const timeline = ref([])

const fetchPapers = async () => {
  try {
    const res = await fetch('/api/papers')
    if (!res.ok) throw new Error('API Error')
    const data = await res.json()
    timeline.value = data
  } catch (e) {
    console.error('Fetch papers error:', e)
    timeline.value = [
      { time: 'Error', title: 'Failed to load ArXiv stream', desc: 'Please check connection' }
    ]
  }
}

// Project Start Time: 2026-01-10 10:00:00 (Simulation)
const startTime = new Date('2026-01-10T10:00:00').getTime()

const updateUptime = () => {
  const now = new Date().getTime()
  const diff = now - startTime
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  serverStats.value.uptime = `${days}d ${hours}h ${minutes}m`
}

const fetchWeather = async () => {
  try {
    // Open-Meteo API for Shanghai (Lat: 31.23, Lon: 121.47)
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&current=temperature_2m')
    const data = await response.json()
    if (data && data.current) {
      serverStats.value.temp = `${data.current.temperature_2m}${data.current_units.temperature_2m}`
    } else {
      serverStats.value.temp = '12°C' // Fallback
    }
  } catch (error) {
    console.error('Failed to fetch weather:', error)
    serverStats.value.temp = 'N/A'
  }
}

let interval
let uptimeInterval

onMounted(() => {
  fetchWeather() // Fetch immediately
  updateUptime() // Update immediately
  fetchPapers()  // Fetch ArXiv papers

  interval = setInterval(() => {
    serverStats.value.latency = Math.floor(Math.random() * 50 + 10) + 'ms'
    serverStats.value.requests = Math.floor(Math.random() * 1000 + 13000) + '/min'
  }, 2000)

  uptimeInterval = setInterval(updateUptime, 60000) // Update every minute
})

onUnmounted(() => {
  clearInterval(interval)
  clearInterval(uptimeInterval)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
</style>
