const variable = document.getElementById("variable");
 variableContainer = document.getElementById("variable_container");
const varValue = document.getElementById("varvalue");

var t = "int";
function f(d) {
    t = d.value
}


function createVariable(clone) {
    const newVariable = document.createElement('div');

    newVariable.classList.add("created_variables");
    newVariable.classList.add("blocks");
    newVariable.setAttribute("id", ("id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)));
    newVariable.setAttribute("var-id", clone.getAttribute("var-id"));
    newVariable.setAttribute("typeof", t);

    
  
    newVariable.innerText = newVariable.getAttribute("var-id");
    

    newVariable.setAttribute("draggable", "true");

    newVariable.addEventListener('dragstart', (e) =>{
        e.dataTransfer.setData('text/plain', e.target.id);
    });

 

    
    variableContainer.appendChild(newVariable);
    varnames.add(clone.querySelector('input[type="text"]').value);

}

function realtimevaluechange(valueInput, clone) {
    const newValue = valueInput.value;
    clone.setAttribute("stored-value", newValue);
}

function getClosestElement(element, attr, cl) {
    let sibling = element.previousElementSibling;
    let closestElement = null;

    while (sibling) {
        if (sibling.hasAttribute(attr)) {
            closestElement = sibling;
            if (closestElement.getAttribute(attr) === cl.getAttribute(attr)) {
                return closestElement;
            }
            sibling = sibling.previousElementSibling;
        }

    }
}