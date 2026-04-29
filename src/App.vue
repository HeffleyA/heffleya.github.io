<script setup>
import NavBar from './components/NavBar.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import CodeBackground from './components/CodeBackground.vue'
</script>

<template>
  <div id="app-wrapper">
    <CodeBackground />
    <NavBar />
    <main>
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <footer>
      <div class="container">
        <span>// built with Vue.js &amp; deployed on GitHub Pages</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app-wrapper {
  position: relative;
  z-index: 1;
}

footer {
  border-top: 1px solid var(--border);
  padding: 1.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.8rem;
}
</style>
