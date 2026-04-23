<script setup>
const projects = [
  {
    name: 'War-Zonez / Tank Game',
    description: 'This "Tank Game" was the first game I had ever completed in Unity. I believe it is a good representation of my baseline understanding of C# code, game physics, and Unity',
    tech: ['C#', 'Unity', 'Visual'],
    github: 'https://github.com/HeffleyA/War-Zonez',
    recording: '/recordings/HeffleyA-TankGame.mp4'
  },
  {
    name: 'Pastry Pets',
    description: 'Pastry Pets is my Capstone Project from Neumont University. Pastry Pets is essentially a "Pokemon clone" in the sense that the player collects monsters and uses them to battle other monsters. Pastry Pets utilizes whisper.unity to take in audio input and convert it text and then a command for the player's Pastry Pets in battle.',
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
]
</script>

<template>
  <section id="projects">
    <div class="container">
      <p class="section-label">// work</p>
      <h2 class="section-title">projects</h2>
      <div class="projects-grid">
        <article v-for="project in projects" :key="project.name" class="project-card">
          <div class="card-header">
            <span class="card-icon">&#128193;</span>
            <div class="card-links">
              <a v-if="project.github" :href="project.github" target="_blank" rel="noopener">[github]</a>
              <a v-if="project.live" :href="project.live" target="_blank" rel="noopener">[live]</a>
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
          ></video>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.project-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
}

.card-header {
  display: flex;
  justify-content: space-between;
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
  margin-top: 0.25rem;
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

</style>
