<script setup>
import { computed, onMounted, ref } from 'vue'
import MarkdownIt from 'vue3-markdown-it'

const version = ref('')
const fileSize = ref('')
const mdContent = ref('')
const releaseDate = ref('')

const primaryDownloadUrl = 'https://cf.981001.xyz/gjf2/Easy-Farm-Setup-Latest.exe'
const mirrorDownloadUrl = 'https://edgeone.gh-proxy.org/https://github.com/hhzxxx/efarm-fkh/releases/download/gjf2/Easy-Farm-Setup-Latest.exe'

const currentVersion = computed(() => version.value || '2.1.91')
const currentFileSize = computed(() => fileSize.value || '72.1MB')
const currentReleaseDate = computed(() => releaseDate.value || '2025-07-13')

const openUrl = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const dl = () => openUrl(mirrorDownloadUrl)
const dl2 = () => openUrl(`${primaryDownloadUrl}?t=${Date.now()}`)
const caimogu = () => openUrl('https://www.caimogu.cc/post/1621584.html')
const poe1 = () => openUrl('https://docs.qq.com/doc/DQ3B3UFJxeEVudFVX')

onMounted(async () => {
  try {
    const [latestResponse, updateResponse] = await Promise.all([
      fetch('/latest.yml'),
      fetch('/update.md'),
    ])

    const yamlContent = await latestResponse.text()
    const rawMarkdown = await updateResponse.text()

    mdContent.value = rawMarkdown.replace(/(https?:\/\/[^\s)]+)/g, '[$1]($1)')

    const versionMatch = yamlContent.match(/version:\s*(.+)/)
    if (versionMatch) version.value = versionMatch[1].trim()

    const sizeMatch = yamlContent.match(/size:\s*(\d+)/)
    if (sizeMatch) {
      const sizeInMB = parseInt(sizeMatch[1], 10) / (1024 * 1024)
      fileSize.value = `${sizeInMB.toFixed(1)}MB`
    }

    const dateMatch = yamlContent.match(/releaseDate:\s*['"]?(.+?)T/)
    if (dateMatch) releaseDate.value = dateMatch[1]
  } catch (error) {
    console.error('Failed to fetch release metadata:', error)
    version.value = '2.1.97'
    fileSize.value = '72.1MB'
    releaseDate.value = '2025-07-13'
  }
})
</script>

<template>
  <div class="page-shell">
    <nav class="nav-bar" aria-label="主导航">
      <a class="brand" href="#top" aria-label="易刷查价器首页">
        <span class="brand-mark">EF</span>
        <span>Easy Farm</span>
      </a>
      <div class="nav-links">
        <a href="#download">下载</a>
        <a href="#updates">更新日志</a>
        <a href="#features">功能说明</a>
        <a href="#faq">常见问题</a>
      </div>
      <button class="nav-cta" type="button" @click="dl2">立即下载</button>
    </nav>

    <main id="top">
      <section class="hero-band" id="download">
        <div class="mesh mesh-one" aria-hidden="true"></div>
        <div class="mesh mesh-two" aria-hidden="true"></div>

        <div class="hero-content">
          <p class="eyebrow">WINDOWS RELEASE CHANNEL</p>
          <h1>易刷查价器，获取最新稳定版本。</h1>
          <p class="hero-copy">
            面向 Path of Exile 玩家的一站式工具发布页。集中提供最新版安装包、更新日志、使用教程与网络问题排查说明。
          </p>

          <div class="hero-actions" aria-label="下载入口">
            <button class="button-primary" type="button" @click="dl2">点击下载 · 分流 1</button>
            <button class="button-secondary" type="button" @click="dl">点击下载 · 分流 2</button>
          </div>

          <div class="quick-links" aria-label="相关链接">
            <button type="button" @click="caimogu">简易介绍地址</button>
            <button type="button" @click="poe1">POE1 登录教程</button>
          </div>
        </div>

        <aside class="release-panel" aria-label="最新版本信息">
          <div class="panel-header">
            <span class="status-dot"></span>
            <span>latest.yml</span>
          </div>
          <dl class="release-meta">
            <div>
              <dt>Version</dt>
              <dd>{{ currentVersion }}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{{ currentFileSize }}</dd>
            </div>
            <div>
              <dt>Release date</dt>
              <dd>{{ currentReleaseDate }}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Windows</dd>
            </div>
          </dl>
          <div class="terminal-card" aria-hidden="true">
            <span>$ download Easy-Farm-Setup-Latest.exe</span>
            <span class="terminal-muted">verified release metadata loaded</span>
          </div>
        </aside>
      </section>

      <section class="stats-strip" aria-label="版本摘要">
        <div>
          <span class="label">当前版本</span>
          <strong>{{ currentVersion }}</strong>
        </div>
        <div>
          <span class="label">安装包大小</span>
          <strong>{{ currentFileSize }}</strong>
        </div>
        <div>
          <span class="label">更新日期</span>
          <strong>{{ currentReleaseDate }}</strong>
        </div>
      </section>

      <section class="section-grid" id="features">
        <div class="section-heading">
          <p class="eyebrow">FEATURES</p>
          <h2>发布页保持简单，下载与排障信息一眼可见。</h2>
          <p>用更清晰的层级承载工具说明、版本状态和游戏适配提示，让用户无需在多处查找关键信息。</p>
        </div>

        <div class="feature-grid">
          <article class="feature-card">
            <span class="feature-index">01</span>
            <h3>版本信息同步</h3>
            <p>自动读取 latest.yml，展示版本号、文件大小、发布时间与 Windows 支持状态。</p>
          </article>
          <article class="feature-card">
            <span class="feature-index">02</span>
            <h3>双下载分流</h3>
            <p>提供主分流与 GitHub Release 代理链接，降低单一路径不可用时的下载阻塞。</p>
          </article>
          <article class="feature-card">
            <span class="feature-index">03</span>
            <h3>教程与问题排查</h3>
            <p>把介绍、登录教程、加速器和网络限制排查集中到同一个页面。</p>
          </article>
        </div>
      </section>

      <section class="updates-section" id="updates">
        <div class="section-heading compact">
          <p class="eyebrow">CHANGELOG</p>
          <h2>更新日志。</h2>
        </div>
        <article class="markdown-card">
          <MarkdownIt class="markdown-body" :source="mdContent" />
        </article>
      </section>

      <section class="content-section" id="faq">
        <article class="content-card large-card">
          <div class="card-copy">
            <p class="eyebrow">NOTES</p>
            <h3>功能说明</h3>
            <ul>
              <li>易泥目前只根据 POE1 实现了所有功能，POE2 是否可用不做保证。</li>
              <li>所有选项在各版本游戏修补内容均一致。</li>
              <li>移除了 POE1 选项中的视距和小地图全开，只在国际服 POE2 选项中保留了这两个功能。</li>
            </ul>
          </div>
          <img src="/gou.jpg" alt="功能说明截图" loading="lazy" />
        </article>

        <article class="content-card large-card">
          <div class="card-copy">
            <p class="eyebrow">FAQ</p>
            <h3>常见问题</h3>
            <ul>
              <li>查价器覆盖层界面很小显示不全：将游戏的窗口大小来回调整一下。</li>
              <li>一直限流太频繁：通常是加速器公用 IP 导致的封锁。</li>
              <li>查价失败：优先检查加速器模式、防火墙或安全软件网络限制。</li>
            </ul>
          </div>
          <img src="/image.png" alt="网络问题排查说明截图" loading="lazy" />
        </article>
      </section>
    </main>

    <footer class="footer">
      <div>
        <strong>Easy Farm</strong>
        <p>易刷查价器下载与更新发布页。</p>
      </div>
      <a href="https://icp.gov.moe/?keyword=20257104" target="_blank" rel="noopener noreferrer">萌ICP备20257104号</a>
    </footer>
  </div>
</template>

<style scoped>
.page-shell {
  position: relative;
  overflow: hidden;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid var(--hairline);
  backdrop-filter: blur(18px);
}

.brand,
.nav-links,
.quick-links,
.hero-actions {
  display: flex;
  align-items: center;
}

.brand {
  gap: 10px;
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
}

.brand-mark {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  color: var(--canvas);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: -0.4px;
  background: var(--ink);
  border-radius: 6px;
}

.nav-links {
  gap: 4px;
}

.nav-links a,
.quick-links button {
  color: var(--body);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
  background: transparent;
  border: 0;
  border-radius: 9999px;
  padding: 8px 12px;
}

.nav-links a:hover,
.quick-links button:hover {
  color: var(--ink);
  background: var(--canvas-soft-2);
}

.nav-cta {
  height: 32px;
  padding: 0 12px;
  color: var(--canvas);
  font-size: 14px;
  font-weight: 500;
  background: var(--ink);
  border: 0;
  border-radius: 6px;
}

.hero-band {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 112px 24px 72px;
}

.mesh {
  position: absolute;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(42px);
  opacity: 0.34;
  pointer-events: none;
}

.mesh-one {
  top: 54px;
  left: 8%;
  width: 560px;
  height: 280px;
  background:
    radial-gradient(circle at 20% 40%, #007cf0 0, transparent 32%),
    radial-gradient(circle at 58% 50%, #7928ca 0, transparent 34%),
    radial-gradient(circle at 82% 30%, #ff0080 0, transparent 26%),
    radial-gradient(circle at 48% 80%, #00dfd8 0, transparent 30%);
}

.mesh-two {
  right: 4%;
  bottom: 32px;
  width: 520px;
  height: 240px;
  background:
    radial-gradient(circle at 24% 48%, #50e3c2 0, transparent 30%),
    radial-gradient(circle at 64% 52%, #ff4d4d 0, transparent 30%),
    radial-gradient(circle at 86% 40%, #f9cb28 0, transparent 28%);
  opacity: 0.22;
}

.hero-content {
  align-self: center;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--mute);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 760px;
  margin-bottom: 20px;
  color: var(--ink);
  font-size: clamp(44px, 7vw, 72px);
  font-weight: 600;
  line-height: 0.96;
  letter-spacing: -3.6px;
}

.hero-copy {
  max-width: 680px;
  margin-bottom: 28px;
  color: var(--body);
  font-size: 18px;
  line-height: 28px;
}

.hero-actions {
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.button-primary,
.button-secondary {
  min-height: 48px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 100px;
}

.button-primary {
  color: var(--canvas);
  background: var(--ink);
  border: 1px solid var(--ink);
}

.button-primary:hover,
.nav-cta:hover {
  background: #000;
}

.button-secondary {
  color: var(--ink);
  background: var(--canvas);
  border: 1px solid var(--hairline);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.button-secondary:hover {
  border-color: var(--hairline-strong);
}

.quick-links {
  flex-wrap: wrap;
  gap: 4px;
}

.release-panel {
  align-self: center;
  padding: 24px;
  color: var(--canvas);
  background: rgba(23, 23, 23, 0.96);
  border-radius: 16px;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.05),
    0 8px 16px -4px rgba(0, 0, 0, 0.16),
    0 24px 48px -20px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.panel-header {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.74);
  font-family: var(--font-mono);
  font-size: 12px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #50e3c2;
  border-radius: 9999px;
  box-shadow: 0 0 0 4px rgba(80, 227, 194, 0.12);
}

.release-meta {
  display: grid;
  gap: 12px;
  margin: 0;
}

.release-meta div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.release-meta dt {
  color: rgba(255, 255, 255, 0.56);
  font-family: var(--font-mono);
  font-size: 12px;
}

.release-meta dd {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.4px;
}

.terminal-card {
  display: grid;
  gap: 4px;
  margin-top: 24px;
  padding: 16px;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

.terminal-muted {
  color: rgba(255, 255, 255, 0.48);
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1200px;
  margin: 0 auto 48px;
  padding: 0 24px;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

.stats-strip div {
  display: grid;
  gap: 6px;
  padding: 24px;
  border-left: 1px solid var(--hairline);
}

.stats-strip div:last-child {
  border-right: 1px solid var(--hairline);
}

.label {
  color: var(--mute);
  font-family: var(--font-mono);
  font-size: 12px;
}

.stats-strip strong {
  color: var(--ink);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.6px;
}

.section-grid,
.updates-section,
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px;
}

.section-heading {
  max-width: 720px;
  margin-bottom: 32px;
}

.section-heading.compact {
  margin-bottom: 20px;
}

.section-heading h2 {
  margin-bottom: 12px;
  color: var(--ink);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -2px;
}

.section-heading p:not(.eyebrow) {
  color: var(--body);
  font-size: 16px;
  line-height: 24px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.feature-card,
.markdown-card,
.content-card {
  background: var(--canvas);
  border-radius: 12px;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.03),
    0 2px 2px rgba(0, 0, 0, 0.04),
    inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.feature-card {
  min-height: 196px;
  padding: 24px;
}

.feature-index {
  display: inline-flex;
  margin-bottom: 28px;
  color: var(--mute);
  font-family: var(--font-mono);
  font-size: 12px;
}

.feature-card h3,
.content-card h3 {
  margin-bottom: 10px;
  color: var(--ink);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.96px;
}

.feature-card p,
.content-card li {
  color: var(--body);
  font-size: 15px;
  line-height: 23px;
}

.markdown-card {
  padding: 32px;
}

.content-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  padding-bottom: 88px;
}

.content-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-copy {
  padding: 24px 24px 8px;
}

.content-card ul {
  margin: 0;
  padding-left: 20px;
}

.content-card li + li {
  margin-top: 8px;
}

.content-card img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  margin-top: auto;
  padding: 16px;
  background: var(--canvas-soft);
  border-top: 1px solid var(--hairline);
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 64px;
  color: var(--body);
  border-top: 1px solid var(--hairline);
}

.footer strong {
  color: var(--ink);
}

.footer p {
  margin: 4px 0 0;
  font-size: 14px;
}

.footer a {
  color: var(--body);
  font-size: 14px;
}

:deep(.markdown-body) {
  color: var(--body);
  font-size: 16px;
  line-height: 1.7;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3) {
  color: var(--ink);
  font-weight: 600;
  letter-spacing: -0.8px;
}

:deep(.markdown-body h1) {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 40px;
}

:deep(.markdown-body h2) {
  margin: 28px 0 12px;
  font-size: 22px;
  line-height: 30px;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 22px;
}

:deep(.markdown-body li) {
  margin: 8px 0;
}

:deep(.markdown-body a) {
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 920px) {
  .nav-links {
    display: none;
  }

  .hero-band {
    grid-template-columns: 1fr;
    padding-top: 72px;
  }

  .release-panel {
    max-width: 560px;
  }

  .feature-grid,
  .content-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav-bar {
    padding: 0 16px;
  }

  .nav-cta {
    display: none;
  }

  .hero-band,
  .section-grid,
  .updates-section,
  .content-section {
    padding-left: 16px;
    padding-right: 16px;
  }

  h1 {
    font-size: 44px;
    letter-spacing: -2.2px;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .button-primary,
  .button-secondary {
    width: 100%;
  }

  .stats-strip {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }

  .stats-strip div,
  .stats-strip div:last-child {
    border-right: 1px solid var(--hairline);
  }

  .stats-strip div + div {
    border-top: 1px solid var(--hairline);
  }

  .markdown-card {
    padding: 22px;
  }

  .footer {
    align-items: flex-start;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
