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
    clone.style.opacity = 1;
    e.dataTransfer.setDragImage(clone, 0, 0);
    clone.className = draggableElement.className;
    clone.classList.add('code');
    if (clone.classList.contains("vari")) {
        createVariable(clone);
        (clone.children[1]).style.display = "none";
    }
    clone.addEventListener('mousedown', (event) => {
        if (event.button === 1) {
            clone.remove();
        }
    });
    program.appendChild(clone);
});

function print(element) {
    const s = element.querySelector('input[type="text"]');
    var input = s.value;
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