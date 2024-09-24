function inputHandler(clone) {
    clone.addEventListener('drop', (e) => {
        const id = e.dataTransfer.getData('text');
        const ele = document.getElementById(id);
        const cl = ele.cloneNode(true);
        cl.style.height = "20px";
        cl.style.cursor = "normal";
        cl.setAttribute("id", null);
        if (cl.classList.contains("created_variables")) {
            clone.append(cl);
            if (cl.classList.contains("vari")) {
                variableContainer.lastChild.remove();
            }
        }
        else {
            error.innerHTML += "That's not a variable idiot!<br>";
        }

    });
}

function input() {
    const inputField = document.createElement('input');
    inputField.setAttribute("type", "text");
    inputField.style = "background-color: black; color: white; outline: none; border: none; font-weight: 600; font-size: 1rem; min-width: 100%; width: auto";
    output.append(inputField);
    inputField.focus()
}