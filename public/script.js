const selectElement = document.querySelector("#select-algo");
const listSizeElement = document.querySelector("#list_size");
const maxNumberElement = document.querySelector("#max_num");
const historyElement = document.querySelector("#history-algo");
const formElement = document.querySelector("#form-algo");

let selectedValue = undefined;
let history = undefined;
let listSize = 0;
let maxNumber = 0;

formElement.addEventListener("submit", function(e) {
  e.preventDefault();

  const lsInt = parseInt(listSizeElement.value, 10);
  const mnInt = parseInt(maxNumberElement.value, 10);

  if (isNaN(lsInt) || isNaN(mnInt)) {
    console.log("Os inputs precisam ser números!!");
    return;
  }

  if (selectedValue === undefined) {
    console.log("Um algoritmo precisa ser selecionado...");
    return;
  }

  $.get(`http://localhost:8080/api/${selectedValue}`, function(data) {
    console.log(data);
  });
});

selectElement.addEventListener("change", function(e) {
  selectedValue = e.target.value;

  $.get(`http://localhost:8080/sorting-history/${selectedValue}`, function(
    data
  ) {
    historyElement.children[0].textContent = data;
  });
});
