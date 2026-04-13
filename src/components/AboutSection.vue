<template>
  <section id="about">
    <div class="container">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">about.sh</span>
        </div>
        <div class="terminal-body">
          <p><span class="prompt">$</span> whoami</p>
          <h1 class="name">Your Name</h1>
          <p class="role">Software Developer</p>

          <br />

          <p><span class="prompt">$</span> cat bio.txt</p>
          <p class="bio">
            A passionate developer with experience building web applications and
            command-line tools. I enjoy solving complex problems and writing clean,
            maintainable code.
          </p>

          <br />

          <p><span class="prompt">$</span> cat location.txt</p>
          <p class="value">Your City, State</p>

          <br />

          <p>
            <span class="prompt">$</span>
            <span class="cursor-blink"> _</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 6rem;
}

.terminal-window {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-surface);
  overflow: hidden;
  max-width: 620px;
}

.terminal-header {
  background: var(--bg-elevated);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red    { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green  { background: #28c840; }

.terminal-title {
  margin-left: auto;
  margin-right: auto;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.terminal-body {
  padding: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 2;
}

.prompt {
  color: var(--accent);
  margin-right: 0.5rem;
  font-weight: 600;
}

.name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  font-family: var(--font-mono);
}

.role {
  color: var(--accent);
  font-size: 0.95rem;
}

.bio {
  color: var(--text-secondary);
  max-width: 480px;
  line-height: 1.8;
}

.value {
  color: var(--text-primary);
}

.cursor-blink {
  color: var(--accent);
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
