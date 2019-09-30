import { Router } from "express";
import path from 'path';

import BubbleSort from "./algorithms/bubble-sort/BubbleSort";
import MergeSort from "./algorithms/merge-sort/MergeSort";
import QuickSort from "./algorithms/quick-sort/QuickSort";
import SelectionSort from "./algorithms/selection-sort/SelectionSort";
import CountingSort from "./algorithms/counting-sort/CountingSort";

import { ExecutionTime } from "./utils/execution-time/ExecutionTime";
import ArrayGenerator from "./utils/array-generator/ArrayGenerator";

const routes = new Router();

routes.get("/api/:sortingAlgorithm", (req, res) => {
  const { sortingAlgorithm } = req.params;

  const { length, maxNumber } = req.query;

  const array = new ArrayGenerator().generate(
    parseInt(length),
    parseInt(maxNumber)
  );

  try {
    const sortedAndTimed =
      sortingAlgorithm === "quicksort"
        ? ExecutionTime(QuickSort, array)
        : sortingAlgorithm === "mergesort"
        ? ExecutionTime(MergeSort, array)
        : sortingAlgorithm === "bubblesort"
        ? ExecutionTime(BubbleSort, array)
        : sortingAlgorithm === "selectionsort"
        ? ExecutionTime(SelectionSort, array)
        : ExecutionTime(CountingSort, array);

    return res.json(sortedAndTimed);
  } catch (error) {
    throw new Error(error);
  }
});

routes.get("/sorting-history/:sortingAlgorithm", (req, res) => {
  const { sortingAlgorithm } = req.params;

  const history = require("./json/history");

  const filtered = Object.keys(history).filter(key => key === sortingAlgorithm);
  const text = history[filtered[0]];

  return res.json(text);
});

routes.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'public', 'index.html')
  )
})

routes.get('/styles.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'public', 'styles.css')
  )
})

routes.get('/script.js', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'public', 'script.js')
  )
})

routes.get('/assets/logo.png', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'public', 'assets', 'logo.png')
  )
})


export default routes;
