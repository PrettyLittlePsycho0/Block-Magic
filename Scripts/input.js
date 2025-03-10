


function input(element) {
    return new Promise((resolve) => {
        if (element.children.length === 0) {
            error.innerHTML += `"Input" needs a variable to work dipshit!<br>`;
            resolve(); 
        } 
        else {
            let input_field = document.createElement('input');
            input_field.classList.add('inp_field');
            output.appendChild(input_field);
            input_field.focus();

            input_field.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    let text = input_field.value;
                    element.setAttribute("stored-value", text)
                    if (text.trim() !== "") {
                        output.innerText += element.getAttribute("stored-value");
                        const variable_inside = element.querySelector('.created_variables');
                        variable_inside.setAttribute("stored-value", input_field.value);
                        input_field.remove();
                        output.innerHTML += "<br>";
                        
                        resolve(); 
                    }
                }           
            });
        }
    });
}
        
