<template>
  <section class="skills-section">
    <div class="container fade-in">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">skills.json</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ npm list --depth=0</span>
          </div>
          
          <div v-for="(category, index) in skillCategories" :key="index" class="skill-category">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="skill-tags">
              <span 
                v-for="(skill, skillIndex) in category.skills" 
                :key="skillIndex"
                class="skill-tag hover-card"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillCategories = [
  {
    title: 'AIGC',
    skills: ['Image2 (AI 生图)', 'Veo3 (Google AI 视频)', 'Seedance 2 (字节 AI 视频)', 'ComfyUI (开源工作流)', 'FFmpeg (视频后期)', 'TTS (AI 配音)']
  },
  {
    title: '后端 & AI',
    skills: ['Python', 'Node.js', 'LangChain', 'RAG', 'Agent 开发', '大模型应用']
  },
  {
    title: '电商运营',
    skills: ['亚马逊运营', 'Temu', 'TikTok Shop', '数据分析', 'ACoS 优化', '产品开发']
  },
  {
    title: '内容创作',
    skills: ['短视频运营', '脚本编剧', '拍摄剪辑', '投流策略', '全流程运营']
  },
  {
    title: '设计能力',
    skills: ['平面设计', '室内设计', '产品设计', 'Figma', 'AutoCAD', 'Photoshop']
  }
]
</script>

<style scoped>
.skills-section {
  padding: 80px 20px;
  background: var(--bg-primary);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.cli-line {
  margin-bottom: 24px;
}

.skill-category {
  margin-bottom: 32px;
}

.category-title {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--success);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-title::before {
  content: '>';
  color: var(--accent);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  border-color: var(--accent);
  background: rgba(88, 166, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(88, 166, 255, 0.2);
}

@media (max-width: 768px) {
  .skills-section {
    padding: 60px 16px;
  }
  
  .category-title {
    font-size: 16px;
  }
  
  .skill-tag {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
