const variable = document.getElementById("variable");
const variableCreationWindow = document.querySelector('.variable-creation-window');

variableContainer = document.getElementById("variable_container");

function variableForm() {
    if (variableCreationWindow.style.display === "none") {
        variableCreationWindow.style.display = "flex";
    } else {
        variableCreationWindow.style.display = "none";
    }
}

function typeHandler(element) {
    const x = variableCreationWindow.querySelector('.varvalue');
    if (element.value === "Number") {
        x.type = "number";
    }
    else if (element.value === "String") {
        x.type = "text";
    }
}

function creation() {
    const ele = document.createElement('div');
    ele.classList.add("code");
    const name = variableCreationWindow.querySelector('.varname');
    const value = variableCreationWindow.querySelector('.varvalue');
    ele.setAttribute("var-id", name.value)
    const c = variableCreationWindow.querySelector('.err');
    //Show error if variable with the same name already exists.
    if (varnames.has(name.value)) {
        c.innerText = name.value + " already exists!";
        c.style.color = "red";
        return;
    }

        ele.setAttribute("stored-value", `${value.value}`);;
        
        //Create a new variable block in the variable container for easy access.
        createVariable(ele);
      
        ele.id = name.value;
        ele.innerText = name.value + " declared here."
        ele.addEventListener('mousedown', (event) => {
            if (event.button === 1) {
                varnames.delete(ele.getAttribute("var-id"))
                const c = document.querySelectorAll('.created_variables');
                c.forEach(i => {
                    if (i.getAttribute("var-id") === ele.getAttribute("var-id")) {
                        i.remove();
                    }
                })
            }
            ele.remove();
        
        })
        ele.classList.add("vari");
        ele.classList.add("blocks")
        program.appendChild(ele)
        varnames.add(name.value)
        c.innerText = "";
    variableForm();

}

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
    //varnames.add(clone.querySelector('input[type="text"]').value);

}

function realtimevaluechange(valueInput, clone) {
    const newValue = valueInput.value;
    clone.setAttribute("stored-value", newValue);
}

