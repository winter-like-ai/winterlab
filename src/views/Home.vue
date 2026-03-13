<template>
  <div class="h-screen bg-winter-dark text-winter-cream flex flex-col overflow-hidden font-body">
    <AppHeader />

    <div class="flex-1 flex overflow-hidden pt-16">
      <!-- Left Sidebar (25%) -->
      <aside class="w-1/4 hidden md:block z-10">
        <LeftSidebar />
      </aside>

      <!-- Main Content (50%) -->
      <main class="w-full md:w-1/2 overflow-y-auto custom-scrollbar relative">
        <div class="p-6 md:p-8 pb-20">
          
          <!-- Hero Section inside Main -->
          <div class="mb-12 text-center relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-winter-blue via-winter-accent to-winter-gold rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-500"></div>
            <div class="relative backdrop-blur-sm bg-winter-dark/30 p-10 rounded-2xl border border-winter-blue/10">
              <h2 class="text-5xl md:text-6xl font-bold mb-4 text-winter-cream tracking-tight font-display italic">
                Winter<span class="text-transparent bg-clip-text bg-gradient-to-r from-winter-blue to-winter-accent">Lab</span>
              </h2>
              <p class="text-winter-cream/80 text-lg font-light leading-relaxed max-w-lg mx-auto tracking-wide">
                Code crafted in silence,<br>
                sparking warmth in the digital cold.
              </p>
            </div>
          </div>

          <!-- Blog Feed -->
          <div class="space-y-8">
            <div class="flex items-center justify-between mb-6 border-b border-winter-blue/10 pb-4">
              <h3 class="text-2xl font-bold text-winter-cream flex items-center gap-3 font-display italic">
                <span class="text-winter-accent text-xl">✦</span> Latest Stories
              </h3>
              <button class="text-xs uppercase tracking-widest hover:text-winter-blue transition-colors text-winter-cream/50">View All</button>
            </div>

            <article v-for="i in 3" :key="i" class="group relative bg-winter-card hover:bg-winter-cream/10 border border-winter-blue/5 hover:border-winter-blue/20 rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-black/20">
            <div class="flex items-start justify-between mb-4">
              <div class="text-[10px] text-winter-gold uppercase tracking-widest font-bold border border-winter-gold/20 px-3 py-1 rounded-full">Story 0{{ i }}</div>
              <div class="text-xs text-winter-blue/60 font-mono">Jan {{ 10 + i }}, 2024</div>
            </div>
            <h4 class="text-xl font-bold mb-3 group-hover:text-winter-blue transition-colors font-display">The Frozen Architecture of Vue 3</h4>
            <p class="text-sm text-winter-cream/70 mb-6 leading-relaxed font-light">
              Exploring the delicate balance between structure and fluidity, much like the formation of ice crystals in a silent winter night.
            </p>
            <div class="flex gap-3">
               <span class="text-[10px] text-winter-cream/40 uppercase tracking-wider">#VueJS</span>
               <span class="text-[10px] text-winter-cream/40 uppercase tracking-wider">#Design</span>
            </div>
          </article>
        </div>

        <!-- Interactive Example Placeholder -->
        <div class="mt-16">
          <div class="flex items-center justify-between mb-8 border-b border-winter-blue/10 pb-4">
            <h3 class="text-2xl font-bold text-winter-cream flex items-center gap-3 font-display italic">
              <span class="text-winter-gold text-xl">✦</span> Interactive Lab
            </h3>
          </div>
          <div class="h-96 rounded-2xl border border-winter-blue/10 bg-winter-card overflow-hidden shadow-2xl shadow-black/30 relative group">
             <CyberParticles />

             <!-- Hover Overlay -->
             <div class="absolute inset-0 bg-gradient-to-t from-winter-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        </div>
      </main>

      <!-- Right Sidebar (25%) -->
      <aside class="w-1/4 hidden md:block z-10">
        <RightSidebar />
      </aside>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import LeftSidebar from '../components/LeftSidebar.vue'
import RightSidebar from '../components/RightSidebar.vue'
import CyberParticles from '../components/CyberParticles.vue'
</script>
