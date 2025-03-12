import { performance, PerformanceObserver } from 'node:perf_hooks'

const perfObserver = new PerformanceObserver((items) => {
    for (const { name, startTime, duration } of items.getEntries()) {
        console.log(`${name} started at ${(startTime.toFixed(4))}ms and took ${(duration.toFixed(4))}ms`)
    }
})
perfObserver.observe({ entryTypes: ["measure", "function"], buffer: true })

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pushUnique(arr, item) {
    // if (arr.includes(item)) return
    return arr.push(item)
}

const arr = []
const set = new Set()

performance.mark('add-arr-start')
pushUnique(arr, 1)
pushUnique(arr, 1)
pushUnique(arr, 2)
performance.mark('add-arr-end')

performance.mark('add-set-start')
set.add(1)
set.add(1)
set.add(2)
performance.mark('add-set-end')

performance.measure('add key to array', 'add-arr-start', 'add-arr-end')
performance.measure('add key to set', 'add-set-start', 'add-set-end')


// Clear
arr.length = 0
set.clear()

// add initial item
set.add(0)
arr[0] = 0

// add middle items
const TOTAL = 100
for (let i = 0; i < TOTAL; i++) {
    pushUnique(arr, randomBetween(1, 100))
    set.add(randomBetween(1, 100))
}

// add final item
pushUnique(arr, TOTAL)
set.add(TOTAL)

performance.mark('includes-end-arr-start')
arr.includes(TOTAL)
performance.mark('includes-end-arr-end')

performance.mark('has-end-set-start')
set.has(TOTAL)
performance.mark('has-end-set-end')

performance.measure('check array existence in the end', 'includes-end-arr-start', 'includes-end-arr-end')
performance.measure('check set existence in the end', 'has-end-set-start', 'has-end-set-end')

performance.mark('includes-beginning-arr-start')
arr.includes(0)
performance.mark('includes-beginning-arr-end')

performance.mark('has-beginning-set-start')
set.has(0)
performance.mark('has-beginning-set-end')

performance.measure('check array existence in the beginning', 'includes-beginning-arr-start', 'includes-beginning-arr-end')
performance.measure('check set existence in the beginning', 'has-beginning-set-start', 'has-beginning-set-end')

performance.mark('includes-middle-arr-start')
arr.includes(86)
performance.mark('includes-middle-arr-end')

performance.mark('has-middle-set-start')
set.has(86)
performance.mark('has-middle-set-end')

performance.measure('check array existence in the middle', 'includes-middle-arr-start', 'includes-middle-arr-end')
performance.measure('check set existence in the middle', 'has-middle-set-start', 'has-middle-set-end')

performance.mark('includes-non-existent-arr-start')
arr.includes(1000)
performance.mark('includes-non-existent-arr-end')

performance.mark('has-non-existent-set-start')
set.has(1000)
performance.mark('has-non-existent-set-end')

performance.measure('check array existence for non-existent', 'includes-non-existent-arr-start', 'includes-non-existent-arr-end')
performance.measure('check set existence for non-existent', 'has-non-existent-set-start', 'has-non-existent-set-end')
