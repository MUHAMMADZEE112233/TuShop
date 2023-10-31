/**
 * Reads an input file, selects goodies for distribution, and writes the output to a file.
 * @param {string} inputFile - The path to the input file.
 * @param {string} outputFile - The path to the output file.
 */
const fs = require('fs');

function selectGoodiesAndWriteOutput(inputFile, outputFile) {
  const input = fs.readFileSync(inputFile, 'utf8');
  const inputLines = input.split('\n');
  const numEmployees = parseInt(inputLines[0].split(': ')[1]);
  const goodiesItems = [];

  for (let i = 2; i < inputLines.length; i++) {
    const [goodieItem, price] = inputLines[i].split(': ');
    goodiesItems.push({ name: goodieItem, price: parseInt(price) });
  }

  goodiesItems.sort((a, b) => a.price - b.price);

  let minPriceDifference = Number.MAX_SAFE_INTEGER;
  let distributionItems = [];

  for (let i = 0; i < goodiesItems.length - numEmployees + 1; i++) {
    const priceDifference =
      goodiesItems[i + numEmployees - 1].price - goodiesItems[i].price;

    if (priceDifference < minPriceDifference) {
      minPriceDifference = priceDifference;
      distributionItems = goodiesItems.slice(i, i + numEmployees);
    }
  }

  let outputString = 'The goodies selected for distribution are:\n';
  for (const goodieItem of distributionItems) {
    outputString += `${goodieItem.name}: ${goodieItem.price}\n`;
  }
  outputString += `And the difference between the chosen goodie with the highest price and the lowest price is ${minPriceDifference}`;

  fs.writeFileSync(outputFile, outputString);
  console.log(outputString);
}

selectGoodiesAndWriteOutput('sample_input.txt', 'sample_output.txt');
