<script setup>
const skills = [
  {
    category: 'Languages',
    icon: '</>',
    items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '{ }',
    items: ['Vue.js', 'React', 'Node.js', 'ASP.NET Core', 'FastAPI'],
  },
  {
    category: 'Tools & Platforms',
    icon: '>>',
    items: ['Git', 'Docker', 'GitHub Actions', 'VS Code', 'Linux'],
  },
]
</script>

<template>
  <section id="skills">
    <div class="container">
      <p class="section-label">// stack</p>
      <h2 class="section-title">skills</h2>
      <div class="skills-grid">
        <div v-for="group in skills" :key="group.category" class="skill-group">
          <div class="group-header">
            <span class="group-icon">{{ group.icon }}</span>
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
