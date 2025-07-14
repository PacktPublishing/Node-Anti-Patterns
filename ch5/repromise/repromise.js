import { readFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";

function repromise(path) {
  return new Promise(function innerPromise(resolve, reject) {
    readFile(path, "utf8").then(resolve).catch(reject);
  });
}

async function benchmark(label, fn) {
  const start = performance.now();
  for (let i = 0; i < 100_000; i++) {
    process.stdout.write(`\rBenchmarking ${label} ${i}...`);
    await fn("./sample.txt");
  }
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(2)}ms`);
}

// await benchmark("Repromised", repromise);
await benchmark("Direct", readFile);
