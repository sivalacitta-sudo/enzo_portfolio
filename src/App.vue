<template>
  <div id="app">
    <HeroSection />
    <SkillsSection />
    <ProjectsSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'

onMounted(() => {
  // 滚动渐入动画
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
#app {
  width: 100%;
}
</style>
