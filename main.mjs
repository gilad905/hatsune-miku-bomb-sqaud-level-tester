import parseLevel from "./level-parser.mjs";
import generateSetups from "./setup-generator.mjs";
import printPart from "./part-printer.mjs";

function solveLevel(levelNum) {
  const level = parseLevel(levelNum);
  // printLevel(level);
  let setupI = 0;
  for (const setup of generateSetups()) {
    // if (setupI % 100000 == 0) {
    //   console.log("setupI", setupI);
    // }
    if (setupMatchesLevel(setup, level)) {
      printPart(setup);
      console.log("");
      // return setup;
    }
    setupI++;
    // if (setupI == 100000) {
    //   throw new Error("too many iterations");
    // }
  }
}

function setupMatchesLevel(setup, level) {
  for (let partI = 0; partI < level.length; partI++) {
    const part = level[partI];
    if (!setupHasPart(setup, part, partI)) {
      return false;
    }
  }
  return true;
}

function setupHasPart(setup, part, partI) {
  for (let rowI = 0; rowI < 3; rowI++) {
    for (let colI = 0; colI < 3; colI++) {
      if (setupHasPartAt(setup, part, rowI, colI, partI)) {
        return true;
      }
    }
  }
}

function setupHasPartAt(setup, part, rowI, colI, partI) {
  for (let partRowI = 0; partRowI < part.length; partRowI++) {
    for (let partCellI = 0; partCellI < part[partRowI].length; partCellI++) {
      const partCell = part[partRowI][partCellI];
      if (rowI + partRowI >= 3 || colI + partCellI >= 3) {
        return false;
      }
      const setupCell = setup[rowI + partRowI][colI + partCellI];
      if (!cellMatchesPartCell(setupCell, partCell)) {
        return false;
      }
    }
  }
  // console.log(`found part #${partI} at ${rowI} ${colI}`);
  // console.log("setup:");
  // printPart(setup);
  // console.log("part:");
  // printPart(part);
  return true;
}

function cellMatchesPartCell(cell, partCell) {
  return (
    [cell.color, "e"].includes(partCell.color) &&
    [cell.shape, "e"].includes(partCell.shape)
  );
}

function printLevel(level) {
  for (const part of level) {
    printPart(part);
    console.log("");
  }
}

// const levelNum = "test";
const levelNum = 21;
console.log(`solving level ${levelNum}`);
const setup = solveLevel(levelNum);
// if (setup) {
//   console.log(`level ${levelNum} setup:`);
//   printPart(setup);
// } else {
//   console.log("no solution found");
// }
