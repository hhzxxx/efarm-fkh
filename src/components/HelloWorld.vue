<script setup>
import { onMounted, ref } from 'vue'
import MarkdownIt from 'vue3-markdown-it';
// import 'github-markdown-css';

const count = ref(0)
const version = ref('')
const fileSize = ref('')
const mdContent = ref('')
const releaseDate = ref('')

const dl = () => {
  window.open(`https://hk.gh-proxy.com/https://github.com/hhzxxx/efarm-fkh/releases/download/gjf2/Easy-Farm-Setup-Latest.exe`)
}

const dl2 = () => {
  window.open(`https://cf.981001.xyz/gjf2/Easy-Farm-Setup-Latest.exe?t=${Date.now()}`)
}

const caimogu = () => {
  window.open(`https://www.caimogu.cc/post/1621584.html`)
}

const poe1 = () => {
  window.open(`https://docs.qq.com/doc/DQ3B3UFJxeEVudFVX`)
}

onMounted(async () => {
  try {
    const response = await fetch('/latest.yml')
    const yamlContent = await response.text()

    const response2 = await fetch('/update.md')
    mdContent.value = await response2.text()

    //连接转化
    const pdfLinkRegex = /(https?:\/\/[^\s]+)/g;

    const result = mdContent.value.replace(pdfLinkRegex, '[点击下载]($1)');
    mdContent.value = result

    // Parse version
    const versionMatch = yamlContent.match(/version: (.+)/)
    if (versionMatch) version.value = versionMatch[1]

    // Parse file size
    const sizeMatch = yamlContent.match(/size: (\d+)/)
    if (sizeMatch) {
      const sizeInMB = parseInt(sizeMatch[1]) / (1024 * 1024)
      fileSize.value = `${sizeInMB.toFixed(1)}MB`
    }

    // Parse release date
    const dateMatch = yamlContent.match(/releaseDate: '(.+?)T/)
    if (dateMatch) releaseDate.value = dateMatch[1]
  } catch (error) {
    console.error('Failed to fetch latest.yml:', error)
    version.value = '2.1.97'
    fileSize.value = '72.1MB'
    releaseDate.value = '2025-07-13'
  }
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>{{ `易刷查价器 最新版本 ${version || '2.1.91'}` }}</h1>
      <p class="subtitle">新增易泥工具箱</p>
    </div>
    <div class="download-options">
      <button class="alt-download" @click="dl2">
        点击下载-分流1
      </button>
      <button class="alt-download" @click="dl">
        点击下载-分流2
      </button>
    </div>
    <div class="download-options">
      <button class="alt-download" @click="caimogu">
        简易介绍地址
      </button>
      <button class="alt-download" @click="poe1">
        poe1登录教程
      </button>
    </div>
    <div class="download-section">
      <div class="download-details">
        <span class="detail">文件大小: {{ fileSize }}</span>
        <span class="detail">更新日期: {{ releaseDate }}</span>
        <span class="detail">支持: Windows</span>
      </div>
    </div>

    <MarkdownIt :source="mdContent" />
  </div>
  <div class="content-section">
    <div class="content-grid">
      <div class="content-card">
        <h3>功能说明</h3>
        <ul>
          <li>易泥目前只根据poe1实现了所有功能，poe2是否可用不做保证</li>
          <li>所有选项在各版本游戏修补内容均一致</li>
          <li>移除了poe1选项中的视距和小地图全开，只在国际服poe2选项中保留了这俩功能</li>
        </ul>
        <img src="/gou.jpg" />
      </div>

      <div class="content-card">
        <h3>常见问题</h3>
        <ul>
          <li>查价器覆盖层界面很小显示不全：将游戏的窗口大小来回调整一下</li>
          <li>一直限流太频繁：加速器公用IP导致的封锁</li>
          <li>查价失败，网络问题看下图解决：</li>
        </ul>
        <img src="/image.png" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.download-section {
  text-align: center;
  margin-bottom: 30px;
}

.download-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.download-details {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.download-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.alt-download {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.alt-download:hover {
  background-color: #e0e0e0;
  border-color: #bbb;
}

@media (prefers-color-scheme: dark) {
  .alt-download {
    background-color: #2a2a2a;
    color: #ffffff;
    border-color: #555;
  }
  
  .alt-download:hover {
    background-color: #3a3a3a;
    border-color: #777;
  }
}

.content-section {
  margin-top: 40px;
}

@media (min-width: 768px) {
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .content-grid {
    display: block;
  }
}

.content-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

@media (prefers-color-scheme: dark) {
  .content-card {
    background: #2a2a2a;
    color: #ffffff;
  }
}

.content-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

@media (prefers-color-scheme: dark) {
  .content-card h3 {
    color: #ffffff;
  }
}

.content-card ul {
  padding-left: 20px;
}

.content-card li {
  margin-bottom: 8px;
}

.content-card img {
  max-width: 100%;
  margin-top: 15px;
  border-radius: 4px;
}

.image-section {
  text-align: center;
  margin: 20px 0;
}

.read-the-docs {
  color: #888;
}
</style>
