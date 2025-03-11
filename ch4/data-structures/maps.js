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

let myObject = {}
let myMap = new Map()
const TOTAL = 1_000_000

const objectSetup = performance.timerify(function createObject(size = TOTAL) {
    for (let i = 0; i < size; i++) {
        myObject[i.toString()] = i
    }
})

const mapSetup = performance.timerify(function createMap(size = TOTAL) {
    for (let i = 0; i < size; i++) {
        myMap.set(i.toString(), i)
    }
})

objectSetup()
mapSetup()

performance.mark('get-obj-start')
myObject[randomBetween(0, TOTAL).toString()]
performance.mark('get-obj-end')

performance.mark('get-map-start')
myMap.get(randomBetween(0, TOTAL).toString())
performance.mark('get-map-end')

performance.measure('get random key from object', 'get-obj-start', 'get-obj-end')
performance.measure('get random key from map', 'get-map-start', 'get-map-end')

performance.mark('add-obj-start')
myObject[randomBetween(TOTAL, TOTAL + 1000)] = TOTAL
performance.mark('add-obj-end')

performance.mark('add-map-start')
myMap.set(randomBetween(TOTAL, TOTAL + 1000), TOTAL)
performance.mark('add-map-end')

performance.measure('add random key to object', 'add-obj-start', 'add-obj-end')
performance.measure('add random key to map', 'add-map-start', 'add-map-end')


performance.mark('check-obj-start')
myObject.hasOwnProperty(TOTAL)
performance.mark('check-obj-end')

performance.mark('check-map-start')
myMap.has(TOTAL)
performance.mark('check-map-end')

performance.measure('check random key of object', 'check-obj-start', 'check-obj-end')
performance.measure('check random key of map', 'check-map-start', 'check-map-end')

performance.mark('iterate-key-obj-start')
for (const key of Object.keys(myObject)) {
    myObject[key]
}
performance.mark('iterate-key-obj-end')

performance.mark('iterate-entries-obj-start')
for (const [, value] of Object.entries(myObject)) {
    value
}
performance.mark('iterate-entries-obj-end')

performance.mark('iterate-map-start')
myMap.forEach((v) => v)
performance.mark('iterate-map-end')

performance.measure('iterate object using entries', 'iterate-entries-obj-start', 'iterate-entries-obj-end')
performance.measure('iterate object using for of', 'iterate-key-obj-start', 'iterate-key-obj-end')
performance.measure('iterate map', 'iterate-map-start', 'iterate-map-end')


performance.mark('delete-obj-start')
delete myObject[TOTAL]
performance.mark('delete-obj-end')

performance.mark('delete-map-start')
myMap.delete(TOTAL)
performance.mark('delete-map-end')

performance.measure('delete random key of object', 'delete-obj-start', 'delete-obj-end')
performance.measure('delete random key of map', 'delete-map-start', 'delete-map-end')

performance.mark('clear-obj-start')
for (const key of Object.keys(myObject)) {
    delete myObject[key]
}
performance.mark('clear-obj-end')

performance.mark('clear-map-start')
myMap.clear(TOTAL)
performance.mark('clear-map-end')

performance.measure('clear object', 'clear-obj-start', 'clear-obj-end')
performance.measure('clear map', 'clear-map-start', 'clear-map-end')
