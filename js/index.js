"use strict";
let selectedTd;
let currentInput;
createTableRow();
initializingValue();

table.onclick = function (event) {
  let td = event.target.closest("td");
  if (!td) return;
  if (!table.contains(td)) return;
  highlight(td);
  showInput(td);
};

btn.onclick = function () {
  addRow();
  localStorage.setItem(`tableRows`, table.rows.length);
};

function showInput(td) {
  if (currentInput) {
    if (td.firstElementChild?.tagName == "INPUT") {
      return;
    }
    currentInput.remove();
  }

  let inputField = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.classList = "input-field";

  currentInput = inputField;

  let coord = td.getBoundingClientRect();
  inputField.style.width = coord.width - 1 + "px";
  inputField.style.height = coord.height - 1 + "px";
  inputField.value = td.innerHTML;
  td.append(inputField);
  inputField.focus();
  let row = td.parentNode.rowIndex;
  let cell = td.cellIndex;

  inputField.onchange = () => {
    localStorage.setItem(`td${row}${cell}`, inputField.value);
  };

  inputField.onblur = function () {
    if (localStorage.getItem(`td${row}${cell}`)) {
      td.innerHTML = localStorage.getItem(`td${row}${cell}`);
    } else td.innerHTML = inputField.value;

    selectedTd.classList.remove("highlight");
  };
}

function highlight(td) {
  if (selectedTd) {
    selectedTd.classList.remove("highlight");
  }
  selectedTd = td;
  selectedTd.classList.add("highlight");
}

function initializingValue() {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      if (localStorage.getItem(`td${i}${j}`)) {
        table.rows[i].cells[j].innerHTML = localStorage.getItem(`td${i}${j}`);
      }
    }
  }
}

function createTableRow() {
  if (!(table.rows.length < localStorage.getItem(`tableRows`))) {
    return;
  }
  let difference = localStorage.getItem(`tableRows`) - table.rows.length;
  for (let i = 0; i < difference; i++) {
    addRow();
  }
}

function addRow() {
  table.innerHTML += `<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>`;
}
