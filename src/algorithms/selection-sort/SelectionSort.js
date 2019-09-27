import Sort from "../Sort";

export default class SelectionSort extends Sort {
  sort(originalArray) {
    let stepper = 0;

    const array = [...originalArray];

    for (let i = 0; i < array.length - 1; i += 1) {
      let minIndex = i;
      stepper++;

      this.callbacks.visitingCallback(array[i]);

      for (let j = i + 1; j < array.length; j += 1) {
        stepper++;
        this.callbacks.visitingCallback(array[j]);

        stepper++;
        if (this.comparator.lessThan(array[j], array[minIndex])) {
          minIndex = j;
          stepper++;
        }
      }

      if (minIndex !== i) {
        stepper++;
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }

    return { array, steps: stepper };
  }
}
