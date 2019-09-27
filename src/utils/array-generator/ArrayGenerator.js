export default class ArrayGenerator {
  generate(length, maxNumber) {
    return Array(length)
      .fill()
      .map(() => Math.round(Math.random() * maxNumber));
  }
}
