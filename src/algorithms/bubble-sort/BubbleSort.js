import Sort from "../Sort";

export default class BubbleSort extends Sort {
  sort(originalArray) {
    let stepper = 0;

    let swapped = false;

    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      stepper++;
      swapped = false;

      this.callbacks.visitingCallback(array[i]);

      for (let j = 0; j < array.length - i; j += 1) {
        stepper++;
        this.callbacks.visitingCallback(array[j]);

        if (this.comparator.lessThan(array[j + 1], array[j])) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          swapped = true;
          stepper++;
        }
      }

      if (!swapped) return { array, steps: stepper };
    }

    return { array, steps: stepper };
  }
}
