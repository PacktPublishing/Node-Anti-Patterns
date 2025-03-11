import { generateKeyPair, generateKeyPairSync } from 'node:crypto'
import { performance, PerformanceObserver } from 'node:perf_hooks'

const perfObserver = new PerformanceObserver((items) => {
    for (const { name, startTime, duration } of items.getEntries()) {
        console.log(`${name} started at ${Math.floor(startTime)}ms and took ${Math.floor(duration)}ms`)
    }
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true })

performance.mark('start-sync')
for (let i = 0; i < 10000; i++) {
    generateKeyPairSync('rsa', {
        modulusLength: 1024,
    })
}
performance.mark('end-sync')
performance.measure('generateKeyPairSync', 'start-sync', 'end-sync')

performance.mark('start-async')
for (let i = 0; i < 10000; i++) {
    generateKeyPair('rsa', {
        modulusLength: 1024,
    }, () => { })
}
performance.mark('end-async')
performance.measure('generateKeyPair', 'start-async', 'end-async')
