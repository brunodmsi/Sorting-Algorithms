const selectElement = document.querySelector("#select-algo");
const listSizeElement = document.querySelector("#list_size");
const maxNumberElement = document.querySelector("#max_num");
const historyElement = document.querySelector("#history-algo");
const formElement = document.querySelector("#form-algo");
const errorMessageElement = document.querySelector("#error-message");
const errorDivElement = document.querySelector("#error");
const beforeArrElement = document.querySelector("#before");

const visualElement = document.querySelector("#visual");
const afterArrElement = document.querySelector("#after #array");
const stepperElement = document.querySelector("#stepper");
const timeElement = document.querySelector("#time");

let selectedValue = undefined;
let history = undefined;
let listSize = 0;
let maxNumber = 0;

errorDivElement.style.display = "none";
visualElement.style.display = "none";

formElement.addEventListener("submit", function(e) {
  e.preventDefault();

  const lsInt = parseInt(listSizeElement.value, 10);
  const mnInt = parseInt(maxNumberElement.value, 10);

  errorMessageElement.textContent = "";
  errorDivElement.style.display = "none";

  if (isNaN(lsInt) || isNaN(mnInt) || lsInt < 0 || mnInt < 0) {
    errorDivElement.style.display = "block";
    errorMessageElement.textContent =
      "Os campos precisam necessitam ser preenchidos e ser números inteiros positivos!";
    return;
  }

  if (selectedValue === undefined) {
    errorDivElement.style.display = "block";
    errorMessageElement.textContent = "Um algoritmo precisa ser selecionado...";
    return;
  }

  $.get(
    `http://localhost:8080/api/${selectedValue}?length=${lsInt}&maxNumber=${mnInt}`,
    function(data) {
      console.log(data);
      visualElement.style.display = "block";
      beforeArrElement.children[1].textContent = `[${data.originalArray}]`;

      afterArrElement.textContent = data.sortedArray.array !== undefined
                                    ? `[${data.sortedArray.array}]`
                                    : `[${data.sortedArray}]`;

      stepperElement.textContent = data.sortedArray.steps !== undefined
                                   ? `Passos: ${data.sortedArray.steps}`
                                   : `Passos: 0`;

      timeElement.textContent = `Tempo de execução: ${data.timeEllapsed}`;
    }
  );
});

selectElement.addEventListener("change", function(e) {
  selectedValue = e.target.value;

  $.get(`http://localhost:8080/sorting-history/${selectedValue}`, function(
    data
  ) {
    historyElement.children[0].textContent = data;
  });
});
