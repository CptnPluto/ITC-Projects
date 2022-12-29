firstName = document.getElementById("first-name");
email = document.getElementById("email-address");
message = document.getElementById("message");
beards = document.getElementById("beards");

firstName.addEventListener("keyup", enableSubmit);
message.addEventListener("keyup", enableSubmit);
email.addEventListener("keyup", enableSubmit);
beards.addEventListener("change", enableSubmit);

// source: https://websitemaintenance.medium.com/simple-javascript-to-disable-submit-button-until-input-fields-are-filled-in-ee9ec13906be

let btn = document.querySelector('input[type="submit"]');
function enableSubmit() {
    let inputs = document.getElementsByClassName('required'); // Enter your class name for a required field, this should also be reflected within your form fields.
    console.log(inputs);
    let isValid = true;
    for (let i = 0; i < inputs.length; i++){
        let changedInput = inputs[i];
        console.log(`changed input = ${changedInput}`)
        if (changedInput.value.trim() === "" || changedInput.value === null){
            isValid = false;
            break;
            }
        }
    btn.disabled = !isValid;        
}

