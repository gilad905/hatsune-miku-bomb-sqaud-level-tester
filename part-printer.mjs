const map = {
  e: "□",
  s: "☆",
  h: "♥",
  d: "♦",
  r: 31,
  y: 33,
  b: 34,
};

export default function printPart(part) {
  for (const row of part) {
    console.log(row.map(getCellChar).join(""));
  }
}

function getCellChar({ color, shape }) {
  // const emoji = shape.toUpperCase();
  const emoji = map[shape];
  if (color == "e") {
    return emoji;
  } else {
    const colorCode = map[color];
    return `\x1b[${colorCode}m${emoji}\x1b[0m`;
  }
}
