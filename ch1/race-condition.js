import { writeFile, unlink } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

async function raceCondition() {
    const filename = join(resolve(dirname(fileURLToPath(import.meta.url)), './race.txt'))
    await unlink(filename)

    writeFile(filename, 'Written from first promise\n', { flag: 'a' })
    writeFile(filename, 'Written from second promise\n', { flag: 'a' })
}

raceCondition().then(() => console.log('Race condition completed'))

