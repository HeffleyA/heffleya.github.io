<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav :class="{ scrolled }">
    <div class="nav-inner container">
      <div class="logo" @click="scrollTo('about')">
        <span class="prompt">&gt;</span> aheffley<span class="cursor">_</span>
      </div>
      <ul class="nav-links">
        <li><button @click="scrollTo('about')">about</button></li>
        <li><button @click="scrollTo('projects')">projects</button></li>
        <li><button @click="scrollTo('skills')">skills</button></li>
        <li><button @click="scrollTo('contact')">contact</button></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.2s, border-color 0.2s;
  border-bottom: 1px solid transparent;
}

nav.scrolled {
  background: rgba(8, 13, 20, 0.9);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.logo {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
}

.prompt {
  color: var(--accent);
}

.cursor {
  color: var(--accent);
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0;
  transition: color 0.15s;
}

.nav-links button::before {
  content: './';
  color: var(--text-muted);
}

.nav-links button:hover {
  color: var(--accent);
}

@media (max-width: 540px) {
  .nav-links {
    gap: 0.75rem;
  }
  .nav-links button {
    font-size: 0.75rem;
  }
  .nav-links button::before {
    content: '';
  }
}
</style>
