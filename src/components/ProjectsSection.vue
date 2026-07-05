<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const projects = [
  {
    name: 'War-Zonez / Tank Game',
    description: 'This "Tank Game" was the first game I had ever completed solo in Unity. I believe it is a good representation of my baseline understanding of C# code, game physics, and Unity.',
    tech: ['C#', 'Unity', 'Visual Studio'],
    github: 'https://github.com/HeffleyA/War-Zonez',
    recording: '/recordings/HeffleyA-TankGame.mp4'
  },
  {
    name: 'Pastry Pets',
    description: 'Pastry Pets is my Capstone Project from Neumont University. Pastry Pets is essentially a "Pokemon clone" in the sense that the player collects monsters and uses them to battle other monsters. Pastry Pets utilizes whisper.unity to take in audio input and convert it to text and then a command for Pastry Pets in battle.',
    tech: ['C#', 'whisper.unity', 'Unity', 'Visual Studio'],
    github: 'https://github.com/HeffleyA/HeffleyA_Capstone_PastryPets',
    recording: '/recordings/HeffleyA-PastryPets.mp4'
  },
  {
    name: 'Pokemon-JS',
    description: 'Pokemon-JS is my first forked repository and the first existing codebase I have ever worked in. It is also my first exposure to React, TypeScript, and Redux. The changes I made to this codebase include implementing a day and night cycle and adding around 25 Pokemon from Pokemon Gold and Pokemon Silver to the game.',
    tech: ['React', 'TypeScript', 'Redux', 'VS Code'],
    github: 'https://github.com/HeffleyA/pokemon-js',
    recording: '/recordings/HeffleyA-Pokemonjs.mp4'
  },
  {
    name: 'Passenger',
    description: 'Passenger is the first game demo I have helped create ever! Passenger at the core of it is meant to be more than a game. The intention behind Passenger is to be a tool to help those with neurodivergency familiarize themselves with social cues and difficult situations. Passenger is the game that really built my foundation for working in a team.',
    tech: ['C#', 'Unity', 'VSCode'],
    recording: '/recordings/Team-9-Passenger.mp4'
  },
  {
    name: 'Harmony Hall',
    description: 'Harmony Hall is the first game demo I have helped create in Unity. Similarly to Passenger, Harmony Hall is meant to be a tool, not just a game. The intention behind Harmony Hall is to help those with neurodivergency understand their feelings and become more emotionally aware of themselves.',
    tech: ['C#', 'Unity', 'VSCode'],
    recording: '/recordings/Team-20-Harmony-Hall.mp4'
  },
  {
    name: 'OhBugger!',
    description: 'OhBugger! is the first game I made during a GameJam in which my team and I had to make a game in 48 hours. The theme of the GameJam was It is not a bugger, it is a feature. I believe OhBugger! is a good representation of my base understanding of Unreal Engine',
    tech: ['Unreal Blueprints', 'Unreal Engine', 'Unreal Editor'],
    github: 'https://github.com/HeffleyA/OhBugger',
    recording: '/recordings/OhBugger.mp4'
  }
]

const currentIndex = ref(0)
const dragOffset = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const trackRef = ref(null)
const containerWidth = ref(900)

const STEP_RATIO = 0.65
const CARD_RATIO = 0.60
const DRAG_THRESHOLD = 60

let ro = null

onMounted(() => {
  containerWidth.value = trackRef.value.getBoundingClientRect().width
  ro = new ResizeObserver(([entry]) => {
    containerWidth.value = entry.contentRect.width
  })
  ro.observe(trackRef.value)
})

onUnmounted(() => ro?.disconnect())

function relPos(i) {
  let rel = i - currentIndex.value
  const half = projects.length / 2
  if (rel > half) rel -= projects.length
  if (rel < -half) rel += projects.length
  return rel + dragOffset.value / (containerWidth.value * STEP_RATIO)
}

function cardStyle(i) {
  const W = containerWidth.value
  const cardW = W * CARD_RATIO
  const pos = relPos(i)
  const abPos = Math.abs(pos)

  const x = W / 2 + pos * W * STEP_RATIO - cardW / 2
  const scale = 1 - Math.min(abPos, 1) * 0.15
  const opacity = abPos > 1.7 ? 0 : Math.max(0.35, 1 - abPos * 0.65)

  return {
    width: `${cardW}px`,
    transform: `translateX(${x}px) scale(${scale})`,
    opacity,
    zIndex: abPos > 1.7 ? 0 : Math.round(10 - abPos * 4),
    transition: isDragging.value
      ? 'none'
      : 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.38s ease',
    pointerEvents: abPos > 1.4 ? 'none' : 'auto',
  }
}

function navigate(dir) {
  currentIndex.value = (currentIndex.value + dir + projects.length) % projects.length
}

function onPointerDown(e) {
  if (e.button !== 0) return
  isDragging.value = true
  dragStartX.value = e.clientX
  dragOffset.value = 0
  e.currentTarget.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!isDragging.value) return
  dragOffset.value = e.clientX - dragStartX.value
}

function onPointerUp() {
  if (!isDragging.value) return
  if (dragOffset.value < -DRAG_THRESHOLD) navigate(1)
  else if (dragOffset.value > DRAG_THRESHOLD) navigate(-1)
  isDragging.value = false
  dragOffset.value = 0
}
</script>

<template>
  <section id="projects">
    <div class="container">
      <p class="section-label">work</p>
      <h2 class="section-title">projects</h2>

      <div class="carousel-outer">
        <button class="arrow" @click="navigate(-1)" aria-label="Previous project">&#8249;</button>

        <div
          ref="trackRef"
          class="carousel-track"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
        >
          <article
            v-for="(project, i) in projects"
            :key="project.name"
            class="project-card"
            :style="cardStyle(i)"
          >
            <div class="card-header">
              <div class="card-links">
                <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" @pointerdown.stop>github</a>
                <a v-if="project.live" :href="project.live" target="_blank" rel="noopener" @pointerdown.stop>live</a>
              </div>
            </div>
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-desc">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
            <video
              v-if="project.recording"
              :src="project.recording"
              controls
              class="project-recording"
              @pointerdown.stop
            ></video>
          </article>
        </div>

        <button class="arrow" @click="navigate(1)" aria-label="Next project">&#8250;</button>
      </div>

      <div class="dots">
        <button
          v-for="(_, i) in projects"
          :key="i"
          class="dot"
          :class="{ active: i === currentIndex }"
          @click="currentIndex = i"
          :aria-label="`Go to project ${i + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-outer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.carousel-track {
  flex: 1;
  position: relative;
  height: 580px;
  overflow: hidden;
  cursor: grab;
}

.carousel-track:active {
  cursor: grabbing;
}

.project-card {
  position: absolute;
  top: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transform-origin: top center;
  will-change: transform, opacity;
}

.project-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
}

.card-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.card-icon {
  font-size: 1.4rem;
}

.card-links {
  display: flex;
  gap: 0.75rem;
  font-size: 0.8rem;
}

.card-links a {
  color: var(--text-muted);
  transition: color 0.15s;
  text-decoration: none;
}

.card-links a:hover {
  color: var(--accent);
}

.project-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.project-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  flex: 1;
  line-height: 1.6;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  font-size: 0.75rem;
  color: var(--accent);
  background: var(--accent-dim);
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.project-recording {
  width: 100%;
  border-radius: 4px;
  max-height: 200px;
  object-fit: cover;
}

.arrow {
  flex-shrink: 0;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 2.2rem;
  line-height: 1;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
  user-select: none;
}

.arrow:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow);
}

.dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.dot.active {
  background: var(--accent);
  transform: scale(1.3);
}
</style>
