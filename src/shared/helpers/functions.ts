export function getRandomNumber(min: number, max: number, numAfterDigit: number = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = getRandomNumber(0, items.length - 1);
  const endPosition = startPosition + getRandomNumber(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomElement<T>(items: T[]):T {
  return items[getRandomNumber(0, items.length - 1)];
}
