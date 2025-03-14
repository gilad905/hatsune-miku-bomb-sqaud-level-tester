/*
  e = empty
  
  d = diamond
  s = star
  h = heart

  b = blue
  r = red
  y = yellow

  "<color><shape>"
*/

import fs from "node:fs";

export default function parseLevel(levelNum) {
  const level = [];
  const rawLevel = fs.readFileSync(`./l-${levelNum}.bsl`, "utf-8");
  const rawParts = rawLevel.split(/\r?\n\r?\n/);
  for (const rawPart of rawParts) {
    const part = [];
    // console.log("part", rawPart);
    const rawRows = rawPart.split(/\r?\n/);
    for (const rawRow of rawRows) {
      const row = [];
      // console.log("row", rawRow);
      const rawCells = rawRow.split(" ");
      for (const rawCell of rawCells) {
        const [color, shape] = rawCell.split("");
        // console.log({ color, shape });
        const cell = { color, shape };
        row.push(cell);
      }
      part.push(row);
    }
    level.push(part);
  }
  // console.log(JSON.stringify(level, null, 2));
  return level;
}

// parseLevel(21);
