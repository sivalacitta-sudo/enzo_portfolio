<template>
  <section class="projects-section">
    <div class="container fade-in">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">projects.json</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ ls ./projects --format=long</span>
          </div>
          
          <div class="projects-grid">
            <!-- 项目1：支持图片滑动 -->
            <div 
              class="project-card terminal-window hover-card"
            >
              <div class="project-image slider-container">
                <button class="slider-btn prev" @click="prevImage">‹</button>
                <img :src="project1Images[currentImageIndex]" :alt="projects[0].name" />
                <button class="slider-btn next" @click="nextImage">›</button>
                <div class="image-indicator">
                  {{ currentImageIndex + 1 }} / {{ project1Images.length }}
                </div>
              </div>
              
              <div class="project-info">
                <h3 class="project-name">{{ projects[0].name }}</h3>
                <p class="project-description">{{ projects[0].description }}</p>
                
                <div class="tech-tags">
                  <span 
                    v-for="tech in projects[0].tech" 
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                
                <a 
                  :href="projects[0].link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn project-link"
                >
                  <span>🔗</span>
                  <span>访问项目</span>
                </a>
              </div>
            </div>

            <!-- 项目2和项目3 -->
            <div 
              v-for="project in projects.slice(1)" 
              :key="project.id"
              class="project-card terminal-window hover-card"
            >
              <div class="project-image">
                <img :src="project.screenshot" :alt="project.name" />
                <div class="project-overlay" v-if="!project.link || project.link === '#'">
                  <span class="badge-local">本地工具</span>
                </div>
              </div>
              
              <div class="project-info">
                <h3 class="project-name">{{ project.name }}</h3>
                <p class="project-description">{{ project.description }}</p>
                
                <div class="tech-tags">
                  <span 
                    v-for="tech in project.tech" 
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                
                <a 
                  v-if="project.link && project.link !== '#'"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn project-link"
                >
                  <span>🔗</span>
                  <span>访问项目</span>
                </a>
                <div v-else class="btn btn-outline disabled">
                  <span>💻</span>
                  <span>可提供演示</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import screenshot1 from '../assets/images/screenshots/0e0ec18f-398f-49eb-8462-0f4bf496e019.png'
import screenshot2 from '../assets/images/screenshots/27ed98e4-91f4-4c6e-ada9-2555ecb3289e.png'
import project2Screenshot from '../assets/images/screenshots/screenshot-20260421-115902.png'
import project3Screenshot from '../assets/images/screenshots/demo3.png'

// 项目1的两张截图（支持左右滑动）
const project1Images = [screenshot1, screenshot2]
const currentImageIndex = ref(0)

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + project1Images.length) % project1Images.length
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % project1Images.length
}

const projects = [
  {
    id: 1,
    name: 'EnzoBuy 电商平台',
    description: '跨境电商独立站解决方案，支持多币种、多语言、智能推荐系统',
    tech: ['Vue 3', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://enzobuy.vercel.app',
    screenshot: screenshot1,
    stats: {
      orders: '处理 50K+ 订单',
      efficiency: '提升 35% 转化',
      revenue: '月销 $120K+'
    }
  },
  {
    id: 2,
    name: '跨境多币种成本换算',
    description: '基于 Coze Platform 的智能客服与自动化工作流，集成多平台 API',
    tech: ['Coze', 'API Integration', 'Workflow Automation'],
    link: 'https://r7gf7t4j4j.coze.site/',
    screenshot: project2Screenshot,
    stats: {
      orders: '服务 10K+ 用户',
      efficiency: '节省 60% 人力',
      revenue: '响应 <2s'
    }
  },
  {
    id: 3,
    name: 'ACoS 推算器',
    description: '亚马逊广告成本分析工具，实时计算最优出价策略，支持批量数据处理',
    tech: ['Python', 'Pandas', 'Excel Automation', 'Data Visualization'],
    link: '#',
    screenshot: project3Screenshot,
    stats: {
      orders: '优化 200+ ASIN',
      efficiency: '降低 28% ACoS',
      revenue: '节省 $50K+/年'
    }
  }
]
</script>

<style scoped>
.projects-section {
  padding: 80px 20px;
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.cli-line {
  margin-bottom: 32px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.project-card {
  overflow: hidden;
  border: 1px solid var(--border);
}

.project-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: var(--bg-card);
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn:hover {
  background: rgba(88, 166, 255, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.slider-btn.prev {
  left: 10px;
}

.slider-btn.next {
  right: 10px;
}

.image-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-family: var(--font-mono);
  z-index: 10;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.badge-local {
  padding: 6px 12px;
  background: rgba(210, 153, 34, 0.9);
  color: #0d1117;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  font-family: var(--font-mono);
}

.project-info {
  padding: 20px;
}

.project-name {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-family: var(--font-mono);
}

.project-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  min-height: 45px;
}

.project-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: 6px;
  border: 1px solid var(--border);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.stat-icon {
  font-size: 14px;
}

.stat-value {
  color: var(--accent);
  font-weight: 600;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-tag {
  padding: 4px 10px;
  background: rgba(88, 166, 255, 0.1);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: 4px;
  font-size: 12px;
  color: var(--accent);
  font-family: var(--font-mono);
}

.project-link {
  width: 100%;
  justify-content: center;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .projects-section {
    padding: 60px 16px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-name {
    font-size: 18px;
  }
  
  .project-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
