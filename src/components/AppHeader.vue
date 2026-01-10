<template>
  <header class="fixed top-0 left-0 w-full h-16 bg-winter-dark/90 backdrop-blur-md border-b border-winter-blue/20 z-50 flex items-center justify-between px-6 transition-colors duration-1000">
    <div class="flex items-center gap-3">
      <div class="w-3 h-3 rounded-full bg-winter-brown animate-pulse"></div>
      <h1 class="text-xl font-bold text-winter-cream tracking-wider font-display">WINTER<span class="text-winter-blue">LAB</span></h1>
    </div>
    
    <nav class="hidden md:flex gap-8">
      <a v-for="item in navItems" :key="item.name" href="#" class="text-winter-cream/70 hover:text-winter-blue transition-colors text-sm uppercase tracking-widest hover:underline decoration-winter-brown underline-offset-4">
        {{ item.name }}
      </a>
    </nav>

    <div class="flex items-center gap-6">
      <div class="hidden md:flex items-center gap-4 text-xs text-winter-blue/60 font-mono">
        <span>SYS.STATUS: ONLINE</span>
        <div class="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
      </div>
      
      <!-- Divider -->
      <div class="w-px h-6 bg-winter-blue/20"></div>

      <!-- Theme Switcher -->
      <ThemeSwitch />
    </div>
  </header>
</template>

<script setup>
import ThemeSwitch from './ThemeSwitch.vue'

const navItems = [
  { name: 'Home' },
  { name: 'Projects' },
  { name: 'Blog' },
  { name: 'About' }
]
</script>
