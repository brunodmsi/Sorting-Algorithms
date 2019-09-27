import Sort from "../Sort";

export default class CountingSort extends Sort {
  sort(originalArray, smallestElement = undefined, biggestElement = undefined) {
    let stepper = 0;

    let detectedSmallestElement = smallestElement || 0;
    let detectedBiggestElement = biggestElement || 0;

    if (smallestElement === undefined || biggestElement === undefined) {
      originalArray.forEach(element => {
        stepper++;
        this.callbacks.visitingCallback(element);

        if (this.comparator.greaterThan(element, detectedBiggestElement)) {
          stepper++;
          detectedBiggestElement = element;
        }

        if (this.comparator.lessThan(element, detectedSmallestElement)) {
          stepper++;
          detectedSmallestElement = element;
        }
      });
    }

    const buckets = Array(
      detectedBiggestElement - detectedSmallestElement + 1
    ).fill(0);

    stepper++;

    originalArray.forEach(element => {
      this.callbacks.visitingCallback(element);
      stepper++;

      buckets[element - detectedSmallestElement] += 1;
    });

    for (let bucketIndex = 1; bucketIndex < buckets.length; bucketIndex += 1) {
      stepper++;
      buckets[bucketIndex] += buckets[bucketIndex - 1];
    }

    buckets.pop();
    stepper++;
    buckets.unshift(0);
    stepper++;

    const sortedArray = Array(originalArray.length).fill(null);
    stepper++;
    for (
      let elementIndex = 0;
      elementIndex < originalArray.length;
      elementIndex += 1
    ) {
      const element = originalArray[elementIndex];
      stepper++;

      this.callbacks.visitingCallback(element);

      const elementSortedPosition = buckets[element - detectedSmallestElement];
      stepper++;

      sortedArray[elementSortedPosition] = element;
      stepper++;
      buckets[element - detectedSmallestElement] += 1;
      stepper++;
    }

    return { array: sortedArray, steps: stepper };
  }
}
