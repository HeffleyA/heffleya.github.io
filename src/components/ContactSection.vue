<template>
  <section id="contact">
    <div class="container">
      <p class="section-label">// reach out</p>
      <h2 class="section-title">contact</h2>
      <div class="contact-block">
        <p class="intro">
          I'm currently open to new opportunities. Whether you have a question
          or just want to connect, feel free to reach out.
        </p>
        <div class="contact-links">
          <a href="mailto:you@email.com" class="contact-item">
            <span class="cmd-prompt">$</span>
            <span class="cmd-name">email</span>
            <span class="cmd-value">you@email.com</span>
          </a>
          <a href="https://github.com/aheffley" target="_blank" rel="noopener" class="contact-item">
            <span class="cmd-prompt">$</span>
            <span class="cmd-name">github</span>
            <span class="cmd-value">github.com/aheffley</span>
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener" class="contact-item">
            <span class="cmd-prompt">$</span>
            <span class="cmd-name">linkedin</span>
            <span class="cmd-value">linkedin.com/in/yourprofile</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-block {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 560px;
}

.intro {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.8;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.contact-item:hover {
  border-color: var(--accent);
  box-shadow: 0 0 14px var(--accent-glow);
  text-decoration: none;
}

.cmd-prompt {
  color: var(--accent);
  font-weight: 600;
}

.cmd-name {
  color: var(--text-secondary);
  font-size: 0.875rem;
  min-width: 5rem;
}

.cmd-value {
  color: var(--accent);
  font-size: 0.875rem;
  margin-left: auto;
}
</style>
