import { performance } from "perf_hooks";

export const ExecutionTime = (SortingClass, originalArray) => {
  const timeStart = performance.now();

  const sorter = new SortingClass();
  const arraySorted = sorter.sort(originalArray);

  const timeEnd = performance.now();

  return {
    timeEllapsed: timeEnd - timeStart,
    array: arraySorted,
    algorithm: sorter.constructor.name
  };
};
