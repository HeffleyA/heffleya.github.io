<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const skills = [
  {
    category: 'Languages',
    items: ['C#', 'C++', 'Java', 'JavaScript', 'Python', 'SQL', 'HTML', 'XAML', 'CSS', 'TypeScript'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['ASP.NET Core', 'ASP.NET Razor', '.NET Maui', 'Blazor', 'Angular'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Visual Studio', 'VSCode', 'Unity', 'Unreal Engine', 'Bitbucket'],
  },
]

const allBlocks = skills.flatMap(group =>
  group.items.map(item => ({ skill: item, category: group.category }))
)

const BLOCK_H = 32   // px per block slot
const BASE_PX = 20   // gap between ground and first block

// Pre-compute x-offsets once — each block drifts from the previous by ±20px,
// clamped so the tower doesn't wander more than 80px off-center.
const offsets = (() => {
  const o = [0]
  for (let i = 1; i < allBlocks.length; i++) {
    const drift = (Math.random() - 0.5) * 40
    o.push(Math.max(-80, Math.min(80, o[i - 1] + drift)))
  }
  return o
})()

const CONTAINER_H = allBlocks.length * BLOCK_H + BASE_PX + 24

const viewMode = ref('stack')
const landedCount = ref(-1)
const sectionRef = ref(null)

let observer = null
let timers = []

function runAnimation() {
  timers.forEach(clearTimeout)
  timers = []
  landedCount.value = -1
  allBlocks.forEach((_, i) => {
    timers.push(setTimeout(() => { landedCount.value = i }, 300 + i * 100))
  })
}

function setMode(mode) {
  viewMode.value = mode
  if (mode === 'stack') {
    landedCount.value = -1
    setTimeout(runAnimation, 60)
  }
}

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      runAnimation()
      observer.disconnect()
      observer = null
    }
  }, { threshold: 0.08 })
  observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  timers.forEach(clearTimeout)
})

function blockStyle(i) {
  return {
    '--si': allBlocks.length - 1 - i,
    '--ox': `${offsets[i]}px`,
  }
}

function catClass(category) {
  if (category === 'Languages') return 'cat-lang'
  if (category === 'Frameworks & Libraries') return 'cat-fw'
  return 'cat-tools'
}
</script>

<template>
  <section id="skills" ref="sectionRef">
    <div class="container">
      <p class="section-label">stack</p>
      <h2 class="section-title">skills</h2>

      <div class="view-toggle">
        <button :class="{ active: viewMode === 'stack' }" @click="setMode('stack')">tower</button>
        <button :class="{ active: viewMode === 'grid' }" @click="setMode('grid')">list</button>
      </div>

      <!-- Tower view -->
      <template v-if="viewMode === 'stack'">
        <div class="stack-container" :style="{ height: CONTAINER_H + 'px' }">
          <div
            v-for="(block, i) in allBlocks"
            :key="block.skill"
            class="stack-block"
            :class="[catClass(block.category), { landed: i <= landedCount }]"
            :style="blockStyle(i)"
          >
            {{ block.skill }}
          </div>
          <div class="stack-ground" />
        </div>

        <div class="stack-legend">
          <span class="legend-item lang">Languages</span>
          <span class="legend-item fw">Frameworks</span>
          <span class="legend-item tools">Tools</span>
        </div>

        <div class="replay-wrap">
          <button class="mono-btn" @click="runAnimation">replay</button>
        </div>
      </template>

      <!-- List view (original) -->
      <div v-else class="skills-grid">
        <div v-for="group in skills" :key="group.category" class="skill-group">
          <div class="group-header">
            <span class="group-name">{{ group.category }}</span>
          </div>
          <div class="skill-tags">
            <span v-for="skill in group.items" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- Toggle ---- */
.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.view-toggle button {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.25rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 3px;
  transition: border-color 0.15s, color 0.15s;
}

.view-toggle button.active,
.view-toggle button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ---- Tower ---- */
.stack-container {
  position: relative;
  overflow: hidden;
}

.stack-block {
  position: absolute;
  bottom: calc(var(--si) * 32px + 20px);
  left: calc(50% - 100px + var(--ox));
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 2px;
  color: var(--text-secondary);
  user-select: none;
  /* hidden above the container until animation fires */
  transform: translateY(-1100px);
  opacity: 0;
}

.stack-block.landed {
  animation: fall-land 0.52s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes fall-land {
  0%   { transform: translateY(-1100px); opacity: 0; }
  6%   { opacity: 1; }
  82%  { transform: translateY(7px); }
  91%  { transform: translateY(-2px); }
  100% { transform: translateY(0); opacity: 1; }
}

.stack-block.landed:hover {
  border-color: var(--accent);
  color: var(--accent);
  z-index: 10;
}

/* Category border tints */
.cat-lang.landed  { border-color: rgba(0, 255, 136, 0.55); }
.cat-fw.landed    { border-color: rgba(100, 200, 255, 0.55); }
.cat-tools.landed { border-color: rgba(255, 195, 80, 0.55); }

.stack-ground {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
  box-shadow: 0 0 14px var(--accent-glow), 0 0 28px var(--accent-glow);
}

/* ---- Legend ---- */
.stack-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.legend-item {
  font-size: 0.72rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.legend-item::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  border: 1px solid;
}

.legend-item.lang::before   { border-color: rgba(0, 255, 136, 0.7);   background: rgba(0, 255, 136, 0.1); }
.legend-item.fw::before     { border-color: rgba(100, 200, 255, 0.7); background: rgba(100, 200, 255, 0.1); }
.legend-item.tools::before  { border-color: rgba(255, 195, 80, 0.7);  background: rgba(255, 195, 80, 0.1); }

/* ---- Replay ---- */
.replay-wrap {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}

.mono-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.3rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 3px;
  transition: border-color 0.15s, color 0.15s;
}

.mono-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ---- List view (original) ---- */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.skill-group {
  border-left: 2px solid var(--accent);
  padding-left: 1.25rem;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.group-icon {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 600;
  min-width: 2.5rem;
}

.group-name {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  padding: 0.3rem 0.85rem;
  border-radius: 4px;
  cursor: default;
  transition: border-color 0.15s, color 0.15s;
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
