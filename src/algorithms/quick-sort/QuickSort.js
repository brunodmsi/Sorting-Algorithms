import Sort from "../Sort";

export default class QuickSort extends Sort {
  sort(originalArray) {
    let stepper = 0;

    const array = [...originalArray];

    if (array.length < 1) return array;

    const leftArray = [];
    const rightArray = [];

    const pivotElement = array.shift();
    stepper++;
    const centerArray = [pivotElement];
    stepper++;

    while (array.length) {
      const currentElement = array.shift();
      stepper++;

      this.callbacks.visitingCallback(currentElement);

      if (this.comparator.equal(currentElement, pivotElement)) {
        centerArray.push(currentElement);
      } else if (this.comparator.lessThan(currentElement, pivotElement)) {
        leftArray.push(currentElement);
      } else {
        rightArray.push(currentElement);
      }
      stepper++;
    }

    const leftArraySorted = this.sort(leftArray);
    stepper++;
    const rightArraySorted = this.sort(rightArray);
    stepper++;

    return leftArraySorted.concat(centerArray, rightArraySorted);
  }
}
