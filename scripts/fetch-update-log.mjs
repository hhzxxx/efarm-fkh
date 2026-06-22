import { writeFile } from 'node:fs/promises'

const UPDATE_URL = 'https://cf.981001.xyz/update.md'
const OUTPUT_PATH = new URL('../public/update.md', import.meta.url)

async function main() {
  const response = await fetch(UPDATE_URL, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; efarm-release-build/1.0)',
      accept: 'text/markdown,text/plain,*/*',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch update log: ${response.status} ${response.statusText}`)
  }

  const content = await response.text()

  if (!content.trim()) {
    throw new Error('Fetched update log is empty')
  }

  await writeFile(OUTPUT_PATH, content.replace(/\r\n/g, '\n'), 'utf8')
  console.log(`Fetched latest update log from ${UPDATE_URL}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
