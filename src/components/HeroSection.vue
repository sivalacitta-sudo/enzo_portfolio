<template>
  <section class="hero-section">
    <div class="container">
      <div class="terminal-window fade-in">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">portfolio.exe</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ whoami</span>
          </div>
          <h1 class="typewriter-text">{{ displayedText }}<span class="cursor-blink"></span></h1>
          <div class="cli-line" style="margin-top: 16px;">
            <span class="cli-prompt">$ cat role.txt</span>
          </div>
          <p class="subtitle">跨境电商开发者 · 全栈工程师 · AI Agent 构建者</p>
          <div class="cli-line" style="margin-top: 16px;">
            <span class="cli-prompt">$ echo $MISSION</span>
          </div>
          <p class="mission">用代码和数据驱动电商增长，从设计到部署全流程自动化</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const fullText = 'ENZO MANGIA BENE'
const displayedText = ref('')
const typingSpeed = 100

onMounted(() => {
  let index = 0
  const typeWriter = () => {
    if (index < fullText.length) {
      displayedText.value += fullText.charAt(index)
      index++
      setTimeout(typeWriter, typingSpeed)
    }
  }
  
  setTimeout(typeWriter, 500)
})
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.container {
  max-width: 900px;
  width: 100%;
}

.cli-line {
  margin-bottom: 8px;
}

.typewriter-text {
  font-family: var(--font-mono);
  font-size: 48px;
  color: var(--accent);
  margin: 16px 0;
  min-height: 60px;
}

.subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  margin: 12px 0;
  font-family: var(--font-mono);
}

.mission {
  font-size: 16px;
  color: var(--text-primary);
  line-height: 1.8;
  padding: 16px;
  background: var(--bg-card);
  border-left: 3px solid var(--success);
  border-radius: 4px;
}

@media (max-width: 768px) {
  .typewriter-text {
    font-size: 32px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .mission {
    font-size: 14px;
  }
}
</style>
