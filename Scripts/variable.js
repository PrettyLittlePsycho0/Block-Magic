const variable = document.getElementById("variable");
variableContainer = document.getElementById("variable_container");


function createVariable(clone) {
    const newVariable = document.createElement('div');

    //set neccessary attributes.
    newVariable.classList.add("created_variables");
    newVariable.classList.add("blocks");
    newVariable.setAttribute("id", ("id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)));
    newVariable.setAttribute("var-id", clone.getAttribute("var-id"));

    
  
    newVariable.innerText = newVariable.getAttribute("var-id");
    

    newVariable.setAttribute("draggable", "true");

    newVariable.addEventListener('dragstart', (e) =>{
        e.dataTransfer.setData('text/plain', e.target.id);
    });

 


    variableContainer.appendChild(newVariable);

    //add the name of the new variable to a set to prevent other variable definitions with the same name.
    varnames.add(clone.querySelector('input[type="text"]').value);

}

function realtimevaluechange(valueInput, clone) {
    const newValue = valueInput.value;
    clone.setAttribute("stored-value", newValue);
}

