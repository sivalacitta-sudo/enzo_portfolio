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

          <Transition name="grid-fade">
            <div class="gallery-grid" :key="activeFilter">
              <!-- 模式 A："全部" — 已有逻辑：首图 + 视频角标 -->
              <template v-if="activeFilter === 'all'">
                <div
                  v-for="work in filteredWorks"
                  :key="work.id"
                  class="gallery-card terminal-window"
                  @click="openGallery(work)"
                >
                  <div class="gallery-media">
                    <img :src="work.images[0]" :alt="work.title" class="gallery-img" />
                    <div v-if="work.video" class="video-badge">▶ 视频</div>
                  </div>
                  <div class="gallery-info">
                    <h4 class="gallery-title">{{ work.title }}</h4>
                    <p class="gallery-desc">{{ work.description }}</p>
                    <div class="gallery-meta">
                      <span v-for="tool in work.tools" :key="tool" class="gallery-tag">{{ tool }}</span>
                      <span class="gallery-year">{{ work.year }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <!-- 模式 B："图片" — 只展示图片卡片 -->
              <template v-if="activeFilter === 'image'">
                <template v-for="work in filteredWorks" :key="work.id">
                  <div
                    v-for="(imgSrc, imgIdx) in work.images"
                    :key="work.id + '-img-' + imgIdx"
                    class="gallery-card terminal-window"
                    @click="openSingle('image', imgSrc, work.title)"
                  >
                    <div class="gallery-media">
                      <img :src="imgSrc" :alt="work.title + ' ' + (imgIdx + 1)" class="gallery-img" />
                    </div>
                    <div class="gallery-info">
                      <h4 class="gallery-title">{{ work.title }} {{ imgIdx + 1 }}</h4>
                      <div class="gallery-meta">
                        <span v-for="tool in work.tools" :key="tool" class="gallery-tag">{{ tool }}</span>
                        <span class="gallery-year">{{ work.year }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </template>

              <!-- 模式 C："视频" — 只展示视频卡片 -->
              <template v-if="activeFilter === 'video'">
                <div
                  v-for="work in filteredWorks"
                  :key="work.id"
                  class="gallery-card terminal-window"
                  @click="openSingle('video', work.video!, work.title)"
                >
                  <div class="gallery-media">
                    <img :src="work.images[0]" :alt="work.title" class="gallery-img" />
                    <div class="video-badge">▶ 播放</div>
                  </div>
                  <div class="gallery-info">
                    <h4 class="gallery-title">{{ work.title }}</h4>
                    <p class="gallery-desc">{{ work.description }}</p>
                    <div class="gallery-meta">
                      <span v-for="tool in work.tools" :key="tool" class="gallery-tag">{{ tool }}</span>
                      <span class="gallery-year">{{ work.year }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="gallery" class="lightbox-overlay" @click="closeGallery">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="closeGallery">✕</button>

          <img
            v-if="gallery.type === 'image'"
            :src="gallery.src"
            :alt="gallery.title"
            class="lightbox-media"
          />

          <video
            v-else-if="gallery.type === 'video'"
            :key="'vid-' + gallery.index"
            :src="gallery.src"
            controls
            playsinline
            preload="auto"
            class="lightbox-media lightbox-video"
          ></video>

          <button
            v-if="gallery.total > 1 && gallery.index > 0"
            class="gallery-nav prev"
            @click="navigate(-1)"
          >‹</button>
          <button
            v-if="gallery.total > 1 && gallery.index < gallery.total - 1"
            class="gallery-nav next"
            @click="navigate(1)"
          >›</button>

          <div v-if="gallery.total > 1" class="gallery-counter">{{ gallery.index + 1 }} / {{ gallery.total }}</div>
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

const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'image', label: '图片' },
  { key: 'video', label: '视频' }
]

const filteredWorks = computed(() => {
  if (activeFilter.value === 'all') return aigcWorks
  if (activeFilter.value === 'image') return aigcWorks.filter((w) => w.images.length > 0)
  if (activeFilter.value === 'video') return aigcWorks.filter((w) => !!w.video)
  return aigcWorks
})

interface GalleryState {
  type: 'image' | 'video'
  src: string
  title: string
  index: number
  total: number
  mediaList: { type: 'image' | 'video'; src: string }[]
}

const gallery = ref<GalleryState | null>(null)

function buildMediaList(work: AigcWork, filter: string): { type: 'image' | 'video'; src: string }[] {
  const list: { type: 'image' | 'video'; src: string }[] = []
  if (filter === 'all' || filter === 'image') {
    work.images.forEach((img) => list.push({ type: 'image', src: img }))
  }
  if (filter === 'all' || filter === 'video') {
    if (work.video) list.push({ type: 'video', src: work.video })
  }
  return list
}

function openGallery(work: AigcWork) {
  const media = buildMediaList(work, activeFilter.value)
  if (media.length === 0) return

  gallery.value = {
    type: media[0].type,
    src: media[0].src,
    title: work.title,
    index: 0,
    total: media.length,
    mediaList: media
  }
}

/** 单图/单视频快速预览 */
function openSingle(type: 'image' | 'video', src: string, title: string) {
  const list = [{ type, src }]
  gallery.value = {
    type,
    src,
    title,
    index: 0,
    total: 1,
    mediaList: list
  }
}

function closeGallery() {
  gallery.value = null
}

function navigate(dir: number) {
  if (!gallery.value) return
  const newIndex = gallery.value.index + dir
  if (newIndex < 0 || newIndex >= gallery.value.total) return

  const item = gallery.value.mediaList[newIndex]
  gallery.value = {
    ...gallery.value,
    type: item.type,
    src: item.src,
    index: newIndex
  }
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

/* ── Grid fade ── */
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 0.2s ease;
}
.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
}

/* ── AIGC 作品网格 ── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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

.gallery-card:hover .gallery-img {
  transform: scale(1.03);
}

.video-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid var(--accent);
  border-radius: 4px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  pointer-events: none;
  z-index: 2;
}

.gallery-info {
  padding: 14px 16px;
}

.gallery-title {
  font-size: 15px;
  color: var(--text-primary);
  font-family: var(--font-mono);
  margin-bottom: 6px;
}

.gallery-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 10px;
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

/* ── Lightbox 画廊 ── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-content {
  position: relative;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-media {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.lightbox-video {
  width: 90vw;
  max-width: 1280px;
}

.lightbox-close {
  position: absolute;
  top: -44px;
  right: 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 30px;
  cursor: pointer;
  font-family: var(--font-mono);
  transition: color 0.2s;
  z-index: 1;
}

.lightbox-close:hover {
  color: #ff5f56;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 36px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 2;
}

.gallery-nav:hover {
  background: rgba(88, 166, 255, 0.3);
  border-color: var(--accent);
}

.gallery-nav.prev {
  left: -60px;
}

.gallery-nav.next {
  right: -60px;
}

.gallery-counter {
  position: absolute;
  bottom: -36px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 13px;
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

  .gallery-nav.prev {
    left: 8px;
  }

  .gallery-nav.next {
    right: 8px;
  }

  .lightbox-video {
    width: 96vw;
  }
}
</style>
