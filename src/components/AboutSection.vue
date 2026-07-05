<template>
  <section id="about">
    <div class="container">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">About</span>
        </div>
        <div class="terminal-body">
          <p>Who am I?</p>
          <h1 class="name">Adrian Heffley</h1>
          <p class="role">Software and Game Developer</p>

          <br />

          <p>Bio</p>
          <p class="bio">
            An adaptable developer always open to learning new languages and technologies and trying different coding practices.
            I have experience building Unity, Unreal Engine, and Web applications.
            I enjoy tackling problems from multiple different angles to come to the most efficient and easy to understand solution.
          </p>

          <br />

          <p>Location</p>
          <p class="value">Salt Lake City, Utah</p>
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
