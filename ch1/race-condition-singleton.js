import { writeFile, unlink } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout } from 'node:timers/promises'

class FileWriter {
    #isWriting = false
    static instance = null

    constructor() {
        if (!FileWriter.instance) {
            FileWriter.instance = this
        }
        return FileWriter.instance
    }

    async writeFile(filename, data) {
        if (this.#isWriting) {
            console.log('Already writing. Waiting for the current write to complete.')
            await setTimeout(250)
            return this.writeFile(filename, data)
        }

        this.#isWriting = true
        console.log(`Writing to ${filename}`)
        const result = await writeFile(filename, data, { flag: 'a' })
        this.#isWriting = false
        return result
    }
}

const writer = new FileWriter()
async function raceCondition() {
    const filename = join(resolve(dirname(fileURLToPath(import.meta.url)), './race.txt'))
    await unlink(filename)

    writer.writeFile(filename, 'Written from first promise\n')
    writer.writeFile(filename, 'Written from second promise\n')
}

raceCondition().then(() => console.log('Race condition completed'))
