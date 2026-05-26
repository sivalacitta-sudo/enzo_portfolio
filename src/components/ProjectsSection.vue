<template>
  <section class="projects-section">
    <!-- Agent 项目区 -->
    <div class="container fade-in">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">agent-registry.json</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ ls ./agents --format=long</span>
          </div>

          <div class="agent-grid">
            <div
              v-for="agent in agents"
              :key="agent.id"
              class="agent-card terminal-window hover-card"
            >
              <div class="agent-cover">
                <img :src="agent.cover" :alt="agent.title" />
              </div>
              <div class="agent-info">
                <h3 class="agent-title">{{ agent.title }}</h3>
                <p class="agent-desc">{{ agent.description }}</p>
                <div class="tech-tags">
                  <span v-for="tag in agent.tags" :key="tag" class="tech-tag">{{ tag }}</span>
                </div>
                <a
                  v-if="agent.url"
                  :href="agent.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn agent-link"
                >访问项目</a>
                <span v-else class="coming-soon">即将补充</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AIGC 作品集区 -->
    <div class="container fade-in" style="margin-top: 40px;">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">aigc-gallery.json</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ ls ./gallery --filter</span>
          </div>

          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab.key"
              class="filter-tab"
              :class="{ active: activeFilter === tab.key }"
              @click="activeFilter = tab.key"
            >{{ tab.label }}</button>
          </div>

          <div class="gallery-grid" :key="activeFilter">
            <div
              v-for="work in filteredWorks"
              :key="work.id"
              class="gallery-card terminal-window"
              :class="{ degraded: isDegraded(work) }"
              @click="handleCardClick(work)"
            >
              <div class="gallery-media">
                <!-- 视频卡片 -->
                <template v-if="work.type === 'video'">
                  <img :src="work.poster" :alt="work.title" class="gallery-img" />
                  <div class="video-overlay">
                    <span v-if="work.src" class="play-icon">▶</span>
                    <span v-else class="placeholder-text">素材待补充</span>
                  </div>
                  <video
                    v-if="work.src"
                    :src="work.src"
                    :poster="work.poster"
                    muted
                    autoplay
                    loop
                    playsinline
                    class="gallery-video"
                    @mouseenter="addControls($event)"
                    @mouseleave="removeControls($event)"
                  ></video>
                </template>
                <!-- 图片卡片 -->
                <img v-else :src="work.src" :alt="work.title" class="gallery-img" />
              </div>
              <div class="gallery-info">
                <h4 class="gallery-title">{{ work.title }}</h4>
                <div class="gallery-meta">
                  <span v-for="tool in work.tools" :key="tool" class="gallery-tag">{{ tool }}</span>
                  <span class="gallery-year">{{ work.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightbox" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="closeLightbox">✕</button>
          <img v-if="lightbox.type === 'image'" :src="lightbox.src" alt="作品大图" />
          <video
            v-else
            :src="lightbox.src"
            controls
            autoplay
            class="lightbox-video"
          ></video>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { agents } from '../data/agents'
import type { AigcWork } from '../data/aigc'
import { aigcWorks } from '../data/aigc'

const activeFilter = ref('all')
const lightbox = ref<{ type: 'image' | 'video'; src: string } | null>(null)

const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'image', label: '图片' },
  { key: 'video', label: '视频' }
]

const filteredWorks = computed(() => {
  if (activeFilter.value === 'all') return aigcWorks
  return aigcWorks.filter((w) => w.type === activeFilter.value)
})

function isDegraded(work: AigcWork) {
  return work.type === 'video' && !work.src
}

function handleCardClick(work: AigcWork) {
  if (isDegraded(work)) return
  if (work.type === 'image' && work.src) {
    lightbox.value = { type: 'image', src: work.src }
  } else if (work.type === 'video' && work.src) {
    lightbox.value = { type: 'video', src: work.src }
  }
}

function closeLightbox() {
  lightbox.value = null
}

function addControls(e: Event) {
  ;(e.target as HTMLVideoElement).setAttribute('controls', '')
}

function removeControls(e: Event) {
  ;(e.target as HTMLVideoElement).removeAttribute('controls')
}
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
  margin-bottom: 24px;
}

/* ── Agent 卡片 ── */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
}

.agent-card {
  overflow: hidden;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.agent-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--bg-card);
}

.agent-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.agent-title {
  font-size: 18px;
  color: var(--text-primary);
  font-family: var(--font-mono);
}

.agent-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

.agent-link {
  align-self: flex-start;
}

.coming-soon {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--warning);
  padding: 8px 16px;
  border: 1px dashed var(--warning);
  border-radius: 4px;
  align-self: flex-start;
}

/* ── 筛选 Tabs ── */
.filter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-tab {
  padding: 8px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.filter-tab.active {
  background: rgba(88, 166, 255, 0.12);
  border-color: var(--accent);
  color: var(--accent);
}

/* ── AIGC 作品网格 ── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  opacity: 1;
  transition: opacity 0.2s ease;
}

/* 过渡时闪一下 */
.gallery-grid:not([key]) {
  opacity: 0.6;
}

@media (max-width: 1279px) and (min-width: 1024px) {
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 1023px) and (min-width: 768px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .gallery-grid { grid-template-columns: 1fr; }
}

.gallery-card {
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
}

.gallery-card.degraded {
  opacity: 0.5;
  cursor: default;
  filter: grayscale(0.4);
}

.gallery-media {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--bg-card);
  aspect-ratio: 4 / 5;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-card:not(.degraded):hover .gallery-img {
  transform: scale(1.03);
}

.gallery-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}

.gallery-card:hover .gallery-video {
  display: block;
}

.video-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
}

.play-icon {
  font-size: 36px;
  color: var(--accent);
  text-shadow: 0 0 12px rgba(88, 166, 255, 0.6);
}

.placeholder-text {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-secondary);
  background: rgba(0, 0, 0, 0.75);
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.gallery-info {
  padding: 12px 16px;
}

.gallery-title {
  font-size: 15px;
  color: var(--text-primary);
  font-family: var(--font-mono);
  margin-bottom: 8px;
}

.gallery-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.gallery-tag {
  padding: 3px 8px;
  background: rgba(63, 185, 80, 0.1);
  border: 1px solid rgba(63, 185, 80, 0.25);
  border-radius: 3px;
  font-size: 11px;
  color: var(--success);
  font-family: var(--font-mono);
}

.gallery-year {
  font-size: 12px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  margin-left: auto;
}

/* ── Lightbox ── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-content {
  position: relative;
  cursor: default;
}

.lightbox-content img,
.lightbox-video {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 28px;
  cursor: pointer;
  font-family: var(--font-mono);
  transition: color 0.2s;
}

.lightbox-close:hover {
  color: #ff5f56;
}

/* ── 响应式 ── */
@media (max-width: 768px) {
  .projects-section {
    padding: 60px 16px;
  }

  .agent-grid {
    grid-template-columns: 1fr;
  }

  .agent-title {
    font-size: 16px;
  }

  .filter-tab {
    padding: 6px 14px;
    font-size: 12px;
  }
}
</style>
