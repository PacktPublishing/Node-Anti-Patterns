function difference(arr1, arr2) {
    return arr1.filter(i => !arr2.includes(i))
}

function intersection(arr1, arr2) {
    return arr1.filter(i => arr2.includes(i))
}

const arr1 = [1, 2, 3]
const arr2 = [2, 3, 4]

const set1 = new Set(arr1)
const set2 = new Set(arr2)

console.time('difference')
difference(arr1, arr2)
console.timeEnd('difference')

console.time('intersection')
intersection(arr1, arr2)
console.timeEnd('intersection')

console.time('setintersection')
set1.intersection(set2)
console.timeEnd('setintersection')

console.time('setdifference')
set1.difference(set2)
console.timeEnd('setdifference')

