<template>
  <section class="contact-section">
    <div class="container fade-in">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">contact.sh</span>
        </div>
        <div class="terminal-body">
          <div class="cli-line">
            <span class="cli-prompt">$ cat contact_info.json</span>
          </div>
          
          <div class="contact-grid">
            <div 
              v-for="(item, index) in contactItems" 
              :key="index"
              class="contact-card hover-card"
              @click="handleClick(item)"
            >
              <div class="contact-icon">{{ item.icon }}</div>
              <div class="contact-info">
                <h3 class="contact-label">{{ item.label }}</h3>
                <p class="contact-value">{{ item.value }}</p>
              </div>
              <div class="contact-action">
                <span v-if="item.copyable" class="copy-hint">点击复制</span>
                <span v-else class="link-hint">访问 →</span>
              </div>
            </div>
          </div>
          
          <div class="footer-message">
            <div class="cli-line">
              <span class="cli-prompt">$ echo "期待与您合作 🚀"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactItems = [
  {
    icon: '📧',
    label: '邮箱',
    value: 'LXFOMG@iCloud.com',
    copyable: true,
    type: 'email'
  },
  {
    icon: '💬',
    label: '微信',
    value: 'ENZOMANGIABENE',
    copyable: true,
    type: 'wechat'
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/sivalacitta-sudo',
    copyable: false,
    type: 'link',
    url: 'https://github.com/sivalacitta-sudo'
  }
]

const handleClick = (item) => {
  if (item.copyable) {
    navigator.clipboard.writeText(item.value).then(() => {
      alert(`已复制${item.label}：${item.value}`)
    }).catch(err => {
      console.error('复制失败:', err)
    })
  } else if (item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.contact-section {
  padding: 80px 20px;
  background: var(--bg-secondary);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.cli-line {
  margin-bottom: 32px;
}

.contact-grid {
  display: grid;
  gap: 16px;
  margin: 32px 0;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: var(--accent);
  background: rgba(88, 166, 255, 0.05);
  transform: translateX(8px);
}

.contact-icon {
  font-size: 32px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.contact-info {
  flex: 1;
}

.contact-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  font-family: var(--font-mono);
}

.contact-value {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 600;
  word-break: break-all;
}

.contact-action {
  font-size: 12px;
  color: var(--accent);
  font-family: var(--font-mono);
  white-space: nowrap;
}

.footer-message {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border);
}

@media (max-width: 768px) {
  .contact-section {
    padding: 60px 16px;
  }
  
  .contact-card {
    padding: 16px;
  }
  
  .contact-icon {
    font-size: 28px;
    width: 44px;
    height: 44px;
  }
  
  .contact-value {
    font-size: 14px;
  }
}
</style>
