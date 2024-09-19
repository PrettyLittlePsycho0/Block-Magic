const variable = document.getElementById("variable");
const typeList = document.getElementById("dropdown");
const variableContainer = document.getElementById("variable_container");
const varValue = document.getElementById("varvalue");



function createVariable(clone) {
    const newVariable = document.createElement('div');
    newVariable.classList.add("created_variables");
    newVariable.classList.add("blocks");
    newVariable.setAttribute("id", ("id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)))

    
    const nameElement = document.createElement('p');
    nameElement.innerHTML = ((clone.querySelector('input[type="text"]')).value) + " |";
    newVariable.appendChild(nameElement);

    const valueElement = document.createElement('p');
    valueElement.innerText = clone.lastElementChild.value;
    newVariable.appendChild(valueElement);

    newVariable.setAttribute("draggable", "true");

    newVariable.addEventListener('dragstart', (e) =>{
        e.dataTransfer.setData('text/plain', e.target.id);
    });
    newVariable.setAttribute("var-id", clone.querySelector('input[type="text"]').value)
    clone.setAttribute("var-id", clone.querySelector('input[type="text"]').value)

    
    variableContainer.appendChild(newVariable);
    varnames.add(clone.querySelector('input[type="text"]').value);

}

function realtimeVariableChange(clone) {
    const h = variableContainer.querySelector(`div[var-id="${clone.getAttribute("var-id")}"]`)
    
}