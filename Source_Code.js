const draggables = document.querySelectorAll('.blocks');
const program = document.getElementById('program');

const output = document.getElementById("output");

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
        (clone.children[1]).style.display = "none";
        const n = clone.children[2];
        n.style.display = "none";
        const ff = document.createElement('p');
        ff.innerHTML = n.value + "&nbsp;" + "Initialized."
        const m = clone.children[3];m.style.display = "none"
        createVariable(clone);
        clone.appendChild(ff);
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
                cl.classList.add("pri_output")
                cl.childNodes.forEach(i => {
                    i.classList.add("pri_output");
                });
                const tar = clone.children[1];
                
                var a
                const b = document.querySelectorAll('.code')
                b.forEach(i => {
                    if (i.hasAttribute('var-id')) {
                        a = document.querySelector(`[var-id = ${cl.getAttribute("var-id")}]`)
                    }
                })
                 

                if (a.compareDocumentPosition(clone) & Node.DOCUMENT_POSITION_FOLLOWING) {
                    tar.remove();
                    clone.appendChild(cl)
                }
                else {
                    console.log("variable not defined");
                }
            }
        });
    }
    if (!(e.target.classList.contains("print_output") || e.target.classList.contains("pri_output"))) {
        program.appendChild(clone);
    }
});


function print(element) {
    const s = element.querySelector('input[type="text"]');
    var input;
    if (s === null) {
        const w = (element.querySelector('.created_variables')).children[1];
        input = w.textContent;
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
    });
}