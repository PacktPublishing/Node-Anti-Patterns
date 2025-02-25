import { pbkdf2Sync, pbkdf2, randomBytes } from 'node:crypto'
import { performance, PerformanceObserver } from 'node:perf_hooks'

const perfObserver = new PerformanceObserver((items) => {
    for (const { name, startTime, duration } of items.getEntries()) {
        console.log(`${name} started at ${Math.floor(startTime)}ms and took ${Math.floor(duration)}ms`)
    }
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true })

performance.mark('start-sync')
for (let i = 0; i < 10000; i++) {
    const password = randomBytes(64).toString('hex')
    pbkdf2Sync(password, randomBytes(8), 100000, 64, 'sha512')
}
performance.mark('end-sync')
performance.measure('generateKeyPairSync', 'start-sync', 'end-sync')

performance.mark('start-async')
for (let i = 0; i < 10000; i++) {
    const password = randomBytes(64).toString('hex')
    pbkdf2(password, randomBytes(8), 100000, 64, 'sha512', () => { })
}
performance.mark('end-async')
performance.measure('generateKeyPair', 'start-async', 'end-async')
