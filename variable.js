const typeList = document.getElementById("dropdown");
const variableContainer = document.getElementById("variable_container");


function createVariable(clone) {
    const newVariable = document.createElement('div');
    newVariable.classList.add("created_variables");
    const name = clone.querySelector('input[type="text"]');
    newVariable.innerText = name.value;
    variableContainer.appendChild(newVariable);
}