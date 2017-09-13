document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    const nameField = document.querySelector("#name");
    const emailField = document.querySelector("#mail");
    const ccField = document.querySelector("#cc-num");
    const zipField = document.querySelector("#zip");
    const cvvField = document.querySelector("#cvv");

    const userTitle = document.querySelector("#title");
    const otherTitleLabel = document.querySelector("#other-title-label");
    const otherTitleInput = document.querySelector("#other-title");
    const themeSelect = document.querySelector("#design");
    const colorsDiv = document.querySelector("#colors-js-puns");
    const activityChk = document.querySelectorAll('[type="checkbox"]');
    const paymentSelect = document.querySelector("#payment");
    const creditDiv = document.querySelector("#credit-card");
    const bitcoinDiv = document.querySelector("#bitcoin");
    const paypalDiv = document.querySelector("#paypal");
    const submitBtn = document.querySelector("button");
    let confTotal = 0;
    const colorOption = {
        'js puns' : [
            document.querySelector('option[value="cornflowerblue"]'),
            document.querySelector('option[value="darkslategrey"]'),
            document.querySelector('option[value="gold"]')
        ],
        'heart js' : [
            document.querySelector('option[value="tomato"]'),
            document.querySelector('option[value="steelblue"]'),
            document.querySelector('option[value="dimgrey"]')
        ]
    };

    // <label>Your Total is $ <span>0</span></label>
    const totalDiv = document.createElement("label");
    totalDiv.id = "totalDiv";
    totalDiv.textContent = "Your Total is $ ";
    const totalSpan = document.createElement("span");
    totalSpan.id = "totalSpan";
    totalSpan.textContent= confTotal;
    totalDiv.appendChild(totalSpan);
    document.querySelector(".activities").appendChild(totalDiv);

    otherTitleLabel.style.display = "none";
    otherTitleInput.style.display = "none";
    colorsDiv.style.display = "none";

    paymentSelect.selectedIndex = 1;
    bitcoinDiv.style.display = "none";
    paypalDiv.style.display = "none";

    // submitBtn.disabled = true;

    // 
    // Job event listner
    // 
    userTitle.addEventListener("change", (e) => {
        const titleSelected = e.target.value;

        if (titleSelected === "other") {
            otherTitleLabel.style.display = "";
            otherTitleInput.style.display = ""; 
        }
        else {
            otherTitleLabel.style.display = "none";
            otherTitleInput.style.display = "none"; 
        }
    });

    // 
    // Theme event listner
    // 
    themeSelect.addEventListener("change", (e) => {
        const themeSelected = e.target.value;
        const designSelect = document.querySelector("#color");
        const selectOption = document.querySelectorAll("#color option");

        selectOption.forEach(function(element) {
            designSelect.removeChild(element);
        });

        if (themeSelected === "js puns") {
            colorsDiv.style.display = "";
            colorOption[themeSelected].forEach(function(element) {
                designSelect.appendChild(element);
            });
        } else if (themeSelected === "heart js") {
            colorsDiv.style.display = "";
            colorOption[themeSelected].forEach(function(element) {
                designSelect.appendChild(element);
            });
        } else  {
            colorsDiv.style.display = "none";
        }
    });

    // 
    // Activity event listner
    // 
    activityChk.forEach(function(element) {
        element.addEventListener("change", (e) => {
            const price = parseInt(e.target.getAttribute("data-price"));
            const activityName = e.target.getAttribute("name");
            const isChecked = e.target.checked;

            if (isChecked) {
                confTotal = confTotal  + price;
                totalSpan.textContent = confTotal;
            } else {
                confTotal = confTotal - price;
                totalSpan.textContent = confTotal;
            }

            switch (activityName) {
                case "js-frameworks":  
                    document.querySelector('[name="express"]').disabled = isChecked;
                    document.querySelector('[name="express"]').parentNode.className = "disabled-" + isChecked;
                    break;
                case "js-libs":
                    document.querySelector('[name="node"]').disabled = isChecked;
                    document.querySelector('[name="node"]').parentNode.className = "disabled-" + isChecked;
                    break;    
                case "node":
                    document.querySelector('[name="js-libs"]').disabled = isChecked;
                    document.querySelector('[name="js-libs"]').parentNode.className = "disabled-" + isChecked;
                    break;
                case "express":
                    document.querySelector('[name="js-frameworks"]').disabled = isChecked;
                    document.querySelector('[name="js-frameworks"]').parentNode.className = "disabled-" + isChecked;
                    break;
                default:
                    console.log("something else pressed pressed");
                    break;
            }
        });  
    });

    // 
    // Payment event listner
    // 
    paymentSelect.addEventListener("change", (e) => {
        const paymentMethod = e.target.value;
        console.log(paymentMethod);

        bitcoinDiv.style.display = "";
        creditDiv.style.display = "";
        paypalDiv.style.display = "";

        switch (paymentMethod) {
            case "bitcoin":  
                creditDiv.style.display = "none";
                paypalDiv.style.display = "none";
                break;
            case "credit card":
                bitcoinDiv.style.display = "none";
                paypalDiv.style.display = "none";
                break;    
            case "paypal":
                bitcoinDiv.style.display = "none";
                creditDiv.style.display = "none";
                break;
            default:
                bitcoinDiv.style.display = "none";
                creditDiv.style.display = "none";
                paypalDiv.style.display = "none";
                break;
        }
    });

    //
    // email event listner
    //
    emailField.addEventListener("keyup", (e) => {
        const val = e.target.value;
        
        const emaiPassed = isEmailValid(val);
        if(emaiPassed.error) {
            e.target.className = "error";
        } else {
            e.target.className = "pass";
        }
    })

    //
    // form submit event listner
    //
    form.addEventListener("submit", (e) => {
        removeError();
        
        const namePassed = isFieldEmpty(nameField);
        if (namePassed.error) {
            console.log(namePassed.error);
            appendError(document.querySelector('[for="name"]'), namePassed.error);
            nameField.className = "error";
        } else {
            nameField.className = "";
        }

        const emailPassed = isEmailValid(emailField.value);
        if (emailPassed.error) {
            console.log(emailPassed.error);
            appendError(document.querySelector('[for="mail"]'), emailPassed.error);
            emailField.className = "error";
        } else {
            emailField.className = "";
        }

        const activityPassed = isActivitySelected();
        if (activityPassed.error) {
            console.log(activityPassed.error);
            appendError(document.querySelector(".activities").firstElementChild, activityPassed.error);
        }

        // if (paymentSelect.selectedIndex == 1)
        // {
            const ccPassed = isCcValid(ccField.value,/^\d{13,16}$/,13,16);
            if (ccPassed.error) {
                console.log(ccPassed.error);
                appendError(document.querySelector('[for="cc-num"]'), ccPassed.error);
                ccField.className = "error";
            }
            else{
                ccField.className = "";
            }
            
            const zipPassed = isCcValid(zipField.value,/^\d{5}$/,5,5);
            if (zipPassed.error) {
                console.log(zipPassed.error);
                appendError(document.querySelector('[for="zip"]'), zipPassed.error);
                zipField.className = "error";
            }
            else{
                zipField.className = "";
            }
            
            const cvvPassed  = isCcValid(cvvField.value,/^\d{3}$/,3,3); 
            if (cvvPassed.error) {
                console.log(cvvPassed.error);
                appendError(document.querySelector('[for="cvv"]'), cvvPassed.error);
                cvvField.className = "error";
            }
            else{
                cvvField.className = "";
            }
        // }

        if (namePassed.error || emailPassed.error || activityPassed.error) {
            if(paymentSelect.selectedIndex == 1)
            {
                if (ccPassed.error || zipPassed.error || cvvPassed.error)
                {
                    event.preventDefault();
                }
            }
            else {
                event.preventDefault();
            }
        }
    });


    //
    // Helper functions
    //

    const appendError = (label, error) => {
        const span = document.createElement("span");
        span.className = "error-text";
        span.textContent = " " + error;
        label.appendChild(span);
    }

    const removeError = () => {
        const errorSpan = document.querySelectorAll(".error-text");

        errorSpan.forEach(function(element) {
            element.remove();
        });
    }

    const isFieldEmpty = (field) => {
        const val = field.value;
        if (val == 0) {
            return {pass: false, error: "Field is empty"};
        } else {
            return true;
        }
    } 

    const isEmailValid = (value) => {
        const emailPattern = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (value == 0) {
            return {pass: false, error: "Field is empty"};
        } else {
            if (emailPattern.test(value) == false) {
                return {pass: false, error: "Email is not valid"};
            }
            else {
                return true;
            }
        }
    }

    const isActivitySelected = () => {

        const activitySelected = document.querySelector("input:checked");
        if(document.querySelector("input:checked")) {
            return true;
        } else {
            return {pass: false, error: "Activity not selected"};
        }
    }

    const isCcValid = (value,pattern, minLength, maxLength) => {
        if (value == 0) {
            return {pass: false, error: "Field is empty"};
        } else if (value.length < minLength || value.length > maxLength){
            return {pass: false, error: "field has to be between " + minLength + " and " + maxLength + " digits"};
        } else if (pattern.test(value) == false){
            return {pass: false, error: "field does not match format"};
        }
        else {
            return true;
        }
    }
});