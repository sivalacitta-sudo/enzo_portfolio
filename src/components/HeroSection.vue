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
          <h1 class="hero-name fade-in-name">{{ displayedText }}<span class="cursor-blink"></span></h1>
          <div class="cli-line" style="margin-top: 16px;">
            <span class="cli-prompt">$ cat role.txt</span>
          </div>
          <p class="subtitle">跨境电商开发者 · 设计师 · AI Agent 构建者</p>
          <div class="cli-line" style="margin-top: 16px;">
            <span class="cli-prompt">$ echo $MISSION</span>
          </div>
          <p class="mission">用 AI 工作流重构视觉创作，从设计、生成到自动化交付全流程提效</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const fullText = '程石'
const displayedText = ref('')

onMounted(() => {
  // 短文本直接淡入，不做逐字打字
  setTimeout(() => {
    displayedText.value = fullText
  }, 300)
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

.hero-name {
  font-family: var(--font-mono);
  font-size: 48px;
  color: var(--accent);
  margin: 16px 0;
  min-height: 60px;
}

.fade-in-name {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
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
  .hero-name {
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
