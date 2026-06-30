import { readFile, writeFile } from 'node:fs/promises'

const UPDATE_URL = 'https://cf.981001.xyz/update.md'
const OUTPUT_PATH = new URL('../public/update.md', import.meta.url)
const TIMEOUT_MS = 15000

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function ensureLocalFallbackExists() {
  const fallback = await readFile(OUTPUT_PATH, 'utf8')

  if (!fallback.trim()) {
    throw new Error('Local public/update.md is empty, cannot use fallback')
  }

  return fallback
}

async function main() {
  try {
    const response = await fetchWithTimeout(UPDATE_URL, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; efarm-release-build/1.0)',
        accept: 'text/markdown,text/plain,*/*',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    const content = await response.text()

    if (!content.trim()) {
      throw new Error('remote update log is empty')
    }

    await writeFile(OUTPUT_PATH, content.replace(/\r\n/g, '\n'), 'utf8')
    console.log(`Fetched latest update log from ${UPDATE_URL}`)
  } catch (error) {
    await ensureLocalFallbackExists()
    console.warn(
      `Warning: failed to fetch latest update log from ${UPDATE_URL}. ` +
        'Using existing public/update.md for this build.\n' +
        `Reason: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
