import { performance, PerformanceObserver } from 'node:perf_hooks'

const perfObserver = new PerformanceObserver((items) => {
    for (const { name, startTime, duration } of items.getEntries()) {
        console.log(`${name} took ${duration.toFixed(4)}ms`);
    }
});

perfObserver.observe({
    entryTypes: ["measure", 'function'],
    buffer: true
});

const f1 = () => { }
const f2 = () => { }
const f3 = () => { }
const f4 = () => { }
const f5 = () => { }

function getFnIf(level) {
    if (level === "info") return f1;
    else if (level === "warn") return f2;
    else if (level === "error") return f3;
    else if (level === "fatal") return f4;
    else return f5;
}

function getFnSwitch(level) {
    switch (level) {
        case "warn":
            return f1;
        case "info":
            return f2;
        case "error":
            return f3;
        case "fatal":
            return f4;
        default:
            return f5;
    }
}

const lookup = {
    'info': f1,
    'warn': f2,
    'error': f3,
    'fatal': f4
}

function getFnLookupString(level) {
    return lookup[level] || f5
}

const levels = ["info", "warn", "error", "fatal"];
const lookupN = {
    '1': f1,
    '2': f2,
    '3': f3,
    '4': f4
}

function getFnLookupN(level) {
    return lookupN[level] || f5
}

function getFnLookupNStr(level) {
    return lookupN[levels[level - 1]] || f5
}

const arr = [f1, f2, f3, f4, f5]
function getFnLookupA(level) {
    return arr[level] || f5
}

const iffn = performance.timerify(function ifCheck() {
    for (let i = 0; i < 1000; i++) {
        getFnIf('info')
        getFnIf('warn')
        getFnIf('error')
        getFnIf('fatal')
        getFnIf()
    }
})

const switchfn = performance.timerify(function switchCase() {
    for (let i = 0; i < 1000; i++) {
        getFnSwitch('info')
        getFnSwitch('warn')
        getFnSwitch('error')
        getFnSwitch('fatal')
        getFnSwitch()
    }
})

const lookupSt = performance.timerify(function strLookup() {
    for (let i = 0; i < 1000; i++) {
        getFnLookupString('info')
        getFnLookupString('warn')
        getFnLookupString('error')
        getFnLookupString('fatal')
        getFnLookupString()
    }
})

const lookupNum = performance.timerify(function numberLookup() {
    for (let i = 0; i < 1000; i++) {
        getFnLookupN('1')
        getFnLookupN('2')
        getFnLookupN('3')
        getFnLookupN('4')
        getFnLookupN()
    }
})

const lookupNumStr = performance.timerify(function numberStrLookup() {
    for (let i = 0; i < 1000; i++) {
        getFnLookupNStr(1)
        getFnLookupNStr(2)
        getFnLookupNStr(3)
        getFnLookupNStr(4)
        getFnLookupNStr()
    }
})

const lookupArr = performance.timerify(function arrlookup() {
    for (let i = 0; i < 1000; i++) {
        getFnLookupA(0)
        getFnLookupA(1)
        getFnLookupA(2)
        getFnLookupA(3)
        getFnLookupA()
    }
})

iffn()
switchfn()
lookupSt()
lookupNum()
lookupNumStr()
lookupArr()
