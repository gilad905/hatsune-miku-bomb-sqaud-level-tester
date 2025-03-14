import printPart from "./part-printer.mjs";

const colors = ["r", "y", "b"];
const shapes = ["s", "h", "d"];

export default function* generateSetups() {
  for (const permutation of generatePermutations(9)) {
    const cells = permutation.map((n) => {
      const color = colors[Math.floor(n / 3)];
      const shape = shapes[n % 3];
      return { color, shape };
    });
    const setup = [];
    for (let i = 0; i < cells.length; i += 3) {
      setup.push(cells.slice(i, i + 3));
    }
    yield setup;
  }
}

function* generatePermutations(n, arr) {
  arr ??= Array.from({ length: n }, (_, i) => i);
  if (n <= 1) {
    yield arr.slice();
  } else {
    for (let i = 0; i < n; i++) {
      yield* generatePermutations(n - 1, arr);
      const j = n % 2 === 0 ? i : 0;
      [arr[j], arr[n - 1]] = [arr[n - 1], arr[j]];
    }
  }
}

function test() {
  let count = 0;
  for (const setup of generateSetups()) {
    printPart(setup);
    console.log("");
    if (++count === 5) break;
  }
}
