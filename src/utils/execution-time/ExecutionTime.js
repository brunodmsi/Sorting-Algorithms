import { performance } from "perf_hooks";

export const ExecutionTime = (SortingClass, originalArray) => {
  const timeStart = performance.now();

  const sorter = new SortingClass();
  const sortedArray = sorter.sort(originalArray);

  const timeEnd = performance.now();

  return {
    timeEllapsed: timeEnd - timeStart,
    originalArray,
    sortedArray,
    algorithm: sorter.constructor.name
  };
};
