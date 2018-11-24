const numberChars = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p',
];

const symbolChars = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z',
];

function numToSymbol(number) {
  const base26array = number.toString(26).split('');
  const symbolArray = base26array.map(val => symbolChars[numberChars.indexOf(val)]);

  return symbolArray.join('').toUpperCase();
}

function symbolToNum(symbol) {
  const symbolArray = symbol.toLowerCase().split('');
  const base26array = symbolArray.map(val => numberChars[symbolChars.indexOf(val)]);

  return parseInt(base26array.join(''), 26);
}

module.exports.numToSymbol = numToSymbol;
module.exports.symbolToNum = symbolToNum;
