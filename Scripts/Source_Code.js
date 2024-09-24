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

    clone.addEventListener('mousedown', (event) => {
        if (event.button === 1) {
            if (clone.classList.contains("vari")) {
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
    

    if (clone.classList.contains("vari")) {
        const name = clone.children[2];
        const value = clone.querySelector('input[type="number"]');
        clone.setAttribute("var-id", clone.querySelector('input[type="text"]').value)
        if (varnames.has(clone.querySelector('input[type="text"]').value)) {
            error.style.color = "red";
            error.innerHTML += `"${name.value}" name already exists cunt!<br>`;
            return;
        }
        clone.setAttribute("typeof", t);
        clone.setAttribute("stored-value", `${value.value}`);
        (clone.children[1]).style.display = "none";
        name.style.display = "none";
        const definedStatement = document.createElement('p');
        definedStatement.innerHTML = name.value + "&nbsp;" + "Defined.";
        value.style.display = "none";
        createVariable(clone, e);
        name.remove();
        value.remove();
        clone.appendChild(definedStatement);
    }

    if (clone.classList.contains("created_variables")) {
        clone.innerText = "";
        const name = document.createElement('p');
        name.innerText = clone.getAttribute("var-id");
        clone.appendChild(name);
        
        const valueInput = document.createElement('input');
        valueInput.setAttribute("type", clone.getAttribute("typeof") === "int" ? "number" : "text");
        valueInput.setAttribute("placeholder", "Value");
        valueInput.style = "text-align: center; border-radius: 10px; outline: none; border: 1px solid rgb(0, 0, 0, 0.4);"
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
                        const m = getClosestElement(clone, "var-id", cl);
                        cl.setAttribute("stored-value", m.getAttribute("stored-value"));
                        
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
        inputHandler(clone);
    }

    if (!(e.target.classList.contains("print_output") || e.target.classList.contains("pri_output") || e.target.classList.contains("bleh"))) {
        program.appendChild(clone);
    }
});


function print(element) {
    const s = element.querySelector('input[type="text"]');
    var input;
    if (s === null) {
        const w = (element.querySelector('.created_variables')).getAttribute("stored-value");
        input = w;
    }
    else {
        input = s.value;
    }
    output.innerText += input;
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
}



function run(){
    cl();
    const code = document.querySelectorAll('.code');
    code.forEach(g => {
        if (g.classList.contains('pri')) {
            print(g);
        }
        else if (g.classList.contains('bre')) {
            lineBreak(g);
        }
        else if (g.classList.contains('spa')) {
            emptySpace(g);
        }
        else if (g.classList.contains('clr')) {
            cl();
        }
        else if (g.classList.contains("inp")) {
            if (g.children[1]) {
                input();
            }
            else {
                error.innerHTML += "One or more of your inputs don't have a variable to store the value in, motherfucker!<br>"
            }
        }
    });
}