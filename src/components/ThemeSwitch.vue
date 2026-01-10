<template>
  <button 
    @click="toggleTheme" 
    class="relative w-14 h-8 rounded-full bg-winter-brown/20 border border-winter-blue/30 cursor-pointer overflow-hidden group transition-colors duration-500"
    :class="{ 'bg-blue-200/50 border-blue-400/50': !isDark }"
    aria-label="Toggle Theme"
  >
    <!-- Background Gradient for Day -->
    <div 
      class="absolute inset-0 bg-gradient-to-r from-blue-100 to-amber-100 opacity-0 transition-opacity duration-700"
      :class="{ 'opacity-100': !isDark }"
    ></div>

    <!-- Toggle Circle (Sun/Moon) -->
    <div 
      class="absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transform transition-all duration-700 cubic-bezier(0.68, -0.55, 0.27, 1.55) z-10 flex items-center justify-center overflow-hidden"
      :class="isDark ? 'bg-winter-dark translate-x-0 border border-winter-blue/50' : 'bg-amber-300 translate-x-6 border border-amber-400'"
    >
      <!-- Moon Craters -->
      <div v-if="isDark" class="absolute w-full h-full opacity-100 transition-opacity duration-300">
         <div class="absolute top-1 right-1 w-1.5 h-1.5 bg-winter-blue/40 rounded-full"></div>
         <div class="absolute bottom-1.5 left-1.5 w-1 h-1 bg-winter-blue/40 rounded-full"></div>
         <div class="absolute top-3 left-2 w-1 h-1 bg-winter-blue/30 rounded-full"></div>
      </div>

      <!-- Sun Rays (Simulated inside) -->
      <div v-else class="absolute w-full h-full animate-spin-slow opacity-100 transition-opacity duration-300 flex items-center justify-center">
         <div class="w-2 h-2 bg-white/40 rounded-full blur-[1px]"></div>
      </div>
    </div>

    <!-- Stars (Dark Mode) -->
    <div 
      class="absolute right-2 top-2 flex gap-0.5 transition-all duration-500 delay-100"
      :class="isDark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
      <div class="w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
      <div class="w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-150"></div>
    </div>

    <!-- Clouds (Light Mode) -->
    <div 
      class="absolute left-2 top-2 transition-all duration-500 delay-100"
      :class="!isDark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="w-4 h-2 bg-white rounded-full blur-[1px] opacity-80"></div>
    </div>

  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateDOM()
}

const updateDOM = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    // Smooth transition trick
    document.body.style.transition = 'background-color 1.5s ease, color 1s ease'
  } else {
    html.classList.remove('dark')
  }
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  // Default to dark if not saved
  isDark.value = savedTheme === 'light' ? false : true
  updateDOM()
})
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 10s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
