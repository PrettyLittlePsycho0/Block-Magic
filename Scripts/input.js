function input(element) {
    return new Promise((resolve) => { 
        let input_field = document.createElement('input'); 
        input_field.classList.add('inp_field');
        output.appendChild(input_field);
        input_field.focus();

        input_field.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                let text = input_field.value;

                element.setAttribute("stored-value", text);
                output.appendChild(document.createTextNode(text));

                if (element.children.length !== 0) {
                    const variable_inside = element.querySelector('.created_variables');
                    variable_inside.setAttribute("stored-value", text);
                }

                input_field.remove();
                output.appendChild(document.createElement("br"));
                resolve();
            }           
        });
    });
}
