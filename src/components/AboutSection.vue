<template>
  <section class="about-section">
    <div class="container fade-in">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">about.md</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ cat career_journey.txt</span>
          </div>
          
          <div class="timeline">
            <div 
              v-for="(phase, index) in careerPhases" 
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3 class="phase-title">{{ phase.title }}</h3>
                <p class="phase-description">{{ phase.description }}</p>
                <div class="phase-tags">
                  <span 
                    v-for="tag in phase.tags" 
                    :key="tag"
                    class="phase-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="philosophy-box">
            <div class="cli-line">
              <span class="cli-prompt">$ echo $PHILOSOPHY</span>
            </div>
            <p class="philosophy-text">
              "从设计审美到 AI 生成，从电商运营到 Agent 自动化，我相信真正的竞争力来自跨领域的整合能力。每一次创作都可以被工作流优化，每一个项目都可以被 AI 放大。"
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const careerPhases = [
  {
    title: '设计阶段 (2020-2024)',
    description: '从平面到室内再到产品设计，建立扎实的美学基础和空间思维',
    tags: ['平面设计', '室内设计', '产品设计', 'AutoCAD', 'Photoshop', 'Figma']
  },
  {
    title: '电商探索 (2024-2026)',
    description: '深入 Temu 与 TikTok Shop，短视频内容创作、投流策略、全流程运营',
    tags: ['Temu', 'TikTok Shop', '短视频编剧', '拍摄剪辑', '投流优化']
  },
  {
    title: '数据驱动 (2024-2026)',
    description: '跨境电商数据分析，开发自动化工具提升运营效率',
    tags: ['数据分析', 'Python', 'Excel 自动化', 'ACoS 优化']
  },
  {
    title: 'AIGC (2024-2026)',
    description: 'AI 生图生视频工作流，作品级视觉产出',
    tags: ['ComfyUI', 'Veo3', 'Seedance', 'Image2', 'FFmpeg', 'TTS']
  },
  {
    title: 'AI Agent 时代 (2024-至今)',
    description: 'LangChain + RAG，企业级 Agent，AI 产品经理',
    tags: ['LangChain', 'RAG', 'Agent 开发', '大模型应用', 'AI 产品']
  }
]
</script>

<style scoped>
.about-section {
  padding: 80px 20px;
  background: var(--bg-primary);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.cli-line {
  margin-bottom: 24px;
}

.timeline {
  position: relative;
  padding-left: 32px;
  margin: 32px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--success));
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-marker {
  position: absolute;
  left: -32px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--bg-primary);
  box-shadow: 0 0 0 2px var(--accent);
}

.timeline-content {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  border-color: var(--accent);
  transform: translateX(8px);
  box-shadow: 0 4px 16px rgba(88, 166, 255, 0.15);
}

.phase-title {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--accent);
  margin-bottom: 8px;
}

.phase-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 12px;
}

.phase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.phase-tag {
  padding: 4px 10px;
  background: rgba(63, 185, 80, 0.1);
  border: 1px solid rgba(63, 185, 80, 0.3);
  border-radius: 4px;
  font-size: 12px;
  color: var(--success);
  font-family: var(--font-mono);
}

.philosophy-box {
  margin-top: 40px;
  padding: 24px;
  background: var(--bg-card);
  border-left: 4px solid var(--warning);
  border-radius: 8px;
}

.philosophy-text {
  font-size: 16px;
  color: var(--text-primary);
  line-height: 1.8;
  font-style: italic;
}

.philosophy-text strong {
  color: var(--accent);
  font-weight: 600;
}

@media (max-width: 768px) {
  .about-section {
    padding: 60px 16px;
  }
  
  .timeline {
    padding-left: 24px;
  }
  
  .timeline::before {
    left: 5px;
  }
  
  .timeline-marker {
    left: -24px;
    width: 12px;
    height: 12px;
  }
  
  .phase-title {
    font-size: 16px;
  }
  
  .philosophy-text {
    font-size: 14px;
  }
}
</style>
