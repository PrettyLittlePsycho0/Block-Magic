const draggables = document.querySelectorAll('.blocks');
const program = document.getElementById('program');
const output = document.getElementById("output");
const errors = document.getElementById("errors");
const error = document.getElementById("error");
error.style.color = "red"
let varnames = new Set();
draggables.forEach(i => {
    i.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        dj = e.target.id;
    });
    
});

// Make sure variable has a name.
program.addEventListener('dragover', (e) => {
    if(dj === "variable") {
        if ((document.getElementById("varname")).value === "") {
            return;
        }
        else {
            e.preventDefault();
        }
    }
    else {
        e.preventDefault();
    }
});

program.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const clone = draggableElement.cloneNode(true);
    clone.className = draggableElement.className;
    clone.setAttribute("id", null);
    clone.setAttribute("draggable", "false");
    clone.classList.add('code');

    //remove a block by clicking middle mouse button
    clone.addEventListener('mousedown', (event) => {
        //also removing specific variable blocks when there initialization block is removed
        if (event.button === 1) {
            if (clone.classList.contains("vari")) {
                varnames.delete(clone.getAttribute("var-id"))
                const c = document.querySelectorAll('.created_variables');
                c.forEach(i => {
                    if (i.getAttribute("var-id") === clone.getAttribute("var-id")) {
                        i.remove();
                    }
                })
            }
            clone.remove();
        }
    });
    
    //Behaviour if the being dropped block is a variable block.
    if (clone.classList.contains("vari")) {
        const name = clone.children[1];
       
        const value = clone.children[2];
        clone.setAttribute("var-id", name.value)

        //Show error if variable with the same name already exists.
        if (varnames.has(name.value)) {
            error.style.color = "red";
            error.innerHTML += `"${name.value}" name already exists cunt!<br>`;
            return;
        }

        clone.setAttribute("stored-value", `${value.value}`);

        //Hide unneccessary stuff(Not deleting).
        name.style.display = "none";
        value.style.display = "none";

        // Variable definition confirmation.
        const definedStatement = document.createElement('p');
        definedStatement.innerHTML = name.value + "&nbsp;" + "Defined.";
        
        //Create a new variable block in the variable container for easy access.
        createVariable(clone);
        name.remove();
        value.remove();
        clone.appendChild(definedStatement);
        clone.id = name.value;
    }

    if (clone.classList.contains("created_variables")) {
        const valueInput = document.createElement('input');
        valueInput.setAttribute("placeholder", "Value");
        valueInput.classList.add("valueInput")
        valueInput.setAttribute("oninput", "realtimevaluechange(this, this.parentElement)")
        clone.appendChild(valueInput);
    }

    if (clone.classList.contains("pri")) {
        clone.addEventListener('drop', (e) => {
            if (e.target.classList.contains("print_output") || e.target.classList.contains("pri_output")) {
                
                const iD = e.dataTransfer.getData('text');
                const ele = document.getElementById(iD);
                
                const cl = ele.cloneNode(true);
                cl.style.height = "20px";
                cl.style.cursor = "normal";
                cl.setAttribute("draggable", "false");
                cl.classList.add("pri_output");
                cl.setAttribute("id", null)
              
                const tar = clone.children[1];
                
                var a
                const b = document.querySelectorAll('.code')
                b.forEach(i => {
                    if (i.hasAttribute('var-id')) {
                        a = document.querySelector(`[var-id = ${cl.getAttribute("var-id")}]`);
                        
                    }
                })
                 

                if (a.compareDocumentPosition(clone) & Node.DOCUMENT_POSITION_FOLLOWING) {
                    tar.remove();
                    
                    clone.appendChild(cl)
                }
                else {
                    error.style.color = "red";
                    error.innerHTML += `Use "${cl.firstChild.textContent}" after its definition asshole!<br>`;
                }
            }
        });
    }

    if (clone.classList.contains("inp")) {
        clone.addEventListener('drop', (e) => {
            const iD = e.dataTransfer.getData('text');
            const ele = document.getElementById(iD);
            console.log(ele)
            let x;
            if (ele.classList.contains('created_variables')) {
                x = getClosestSiblingBefore2(clone, "var-id", ele.getAttribute("var-id"))
                if (x) {
                    clone.setAttribute("var-id", x.getAttribute("var-id"))
                    if (ele.classList.contains('created_variables') && x.getAttribute("var-id") == ele.getAttribute("var-id")) {
                        const cl = ele.cloneNode(true);
                        cl.style.height = "20px";
                        cl.style.cursor = "normal";
                        cl.setAttribute("draggable", "false");
                        cl.classList.add("pri_output");
                        cl.setAttribute("id", null)
                        clone.appendChild(cl);
                    }
                    else {
                        error.innerHTML += `Define the specific variable first!<br>`;
                        error.style.color = "red";
                    }
                } 
                else {
                    error.innerHTML += `Define a variable first!<br>`;
                    error.style.color = "red";
                }
            }
            else {
                error.innerHTML += `That's not a varible!`;
                error.style.color = "red";
            }
            
        })
    }


    if (!(e.target.classList.contains("print_output") || e.target.classList.contains("pri_output") || e.target.classList.contains("bleh") || e.target.classList.contains("inp"))) {
        program.appendChild(clone);
    }
});
function getClosestSiblingBefore(element, attributeName) {
    let prevElement = element.previousElementSibling;
    
    while (prevElement) {
        if (prevElement.hasAttribute(attributeName)) {
            return prevElement;
        }
        prevElement = prevElement.previousElementSibling;
    }

    return null; // No matching element found
}
function getClosestSiblingBefore2(element, attributeName, attributeValue) {
    let prevElement = element.previousElementSibling;
    
    while (prevElement) {
        if (prevElement.getAttribute(attributeName) === attributeValue) {
            return prevElement;
        }
        prevElement = prevElement.previousElementSibling;
    }

    return null; // No matching element found
}
function print(element) {
    const s = element.querySelector('input[type="text"]');
    var input;
    if (s === null) {
        const variable_block_in_print = (element.querySelector('.created_variables'));
        const lastSavedValueElement = getClosestSiblingBefore2(element, "var-id", variable_block_in_print.getAttribute("var-id"));
        if (lastSavedValueElement) {
            variable_block_in_print.setAttribute("stored-value", lastSavedValueElement.getAttribute("stored-value"));
        }
            
       
        input = variable_block_in_print.getAttribute("stored-value");
    }
    else {
        input = s.value;
    }
    let newstr = input.replace(/ /g, "&nbsp;");
    output.innerHTML += newstr;
}

function lineBreak(element) {
    const brIn = element.querySelector('input[type="number"]')
    for (let i = 0; i <= brIn.value; i++) {
        output.appendChild(document.createElement('br'));
    }
}

function emptySpace(element) {
    const amount = element.querySelector('input[type="number"]');
    for (let i = 1; i <= amount.value; i++) {
        output.innerHTML += "&nbsp;";
    }
}

function cl() {
    output.innerText = "";
    error.innerHTML = "";
}



async function run() {
    cl();
    const code_blocks = document.querySelectorAll('.code');

    for (const code_block of code_blocks) { 
        if (code_block.classList.contains('pri')) {
            print(code_block);
        } 
        else if (code_block.classList.contains('bre')) {
            lineBreak(code_block);
        } 
        else if (code_block.classList.contains('spa')) {
            emptySpace(code_block);
        } 
        else if (code_block.classList.contains('clr')) {
            cl();
        } 
        else if (code_block.classList.contains('inp')) {
            await input(code_block);
        }
    }
}
