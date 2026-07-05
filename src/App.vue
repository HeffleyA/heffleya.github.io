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
        <span>built with Vue.js &amp; deployed on GitHub Pages</span>
        <p class="disclaimer">
          This site was generated with the help of Claude (Anthropic's AI), then
          reviewed, edited, and refined by Adrian Heffley.
        </p>
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

.disclaimer {
  margin-top: 0.75rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.72rem;
  line-height: 1.6;
  opacity: 0.75;
}
</style>
