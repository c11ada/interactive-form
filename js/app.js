document.addEventListener("DOMContentLoaded", () => {

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

    const form = document.querySelector("form");
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

    // create label to display total cost of activities
    // <label>Your Total is $ <span>0</span></label>
    const totalDiv = document.createElement("label");
    totalDiv.id = "totalDiv";
    totalDiv.textContent = "Your Total is $ ";
    const totalSpan = document.createElement("span");
    totalSpan.id = "totalSpan";
    totalSpan.textContent= confTotal;
    totalDiv.appendChild(totalSpan);
    document.querySelector(".activities").appendChild(totalDiv);

    // hide other title input and label
    otherTitleLabel.style.display = "none";
    otherTitleInput.style.display = "none";

    // hide color selector div
    colorsDiv.style.display = "none";

    // set payment type to 1 - credit card
    // hide bit and paypal sections
    paymentSelect.selectedIndex = 1;
    bitcoinDiv.style.display = "none";
    paypalDiv.style.display = "none";

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

        // remove the curent list of options
        selectOption.forEach(function(element) {
            designSelect.removeChild(element);
        });

        // display new list of options depending on theme selected
        if (themeSelected === "js puns") {
            // remove dispplay none style
            colorsDiv.style.display = "";
            // foreach colorOption[js puns] -> append to option list
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
    // loop through each checkbox to add event listner
    activityChk.forEach(function(element) {
        element.addEventListener("change", (e) => {
            // get price element
            const price = parseInt(e.target.getAttribute("data-price"));
            const activityName = e.target.getAttribute("name");
            const isChecked = e.target.checked;

            // if ctivity is checked add price to total
            // else remove
            if (isChecked) {
                confTotal = confTotal  + price;
                totalSpan.textContent = confTotal;
            } else {
                confTotal = confTotal - price;
                totalSpan.textContent = confTotal;
            }

            switch (activityName) {
                case "js-frameworks":  
                    modifyActivityState("express",isChecked);
                    break;
                case "js-libs":
                    modifyActivityState("node",isChecked);
                    break;    
                case "node":
                    modifyActivityState("js-libs",isChecked);
                    break;
                case "express":
                    modifyActivityState("js-frameworks",isChecked);
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

        // hide all three sections
        bitcoinDiv.style.display = "";
        creditDiv.style.display = "";
        paypalDiv.style.display = "";

        // dislay relevnant dection switch on payment method
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
    // real time validation on email field as user types
    emailField.addEventListener("keyup", (e) => {
        const val = e.target.value;
        // check to see if email is valid
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
        // remove any previous errors
        removeError();
        
        // check name is not empty
        const namePassed = isFieldEmpty(nameField);
        if (namePassed.error) {
            console.log(namePassed.error);
            appendError(document.querySelector('[for="name"]'), namePassed.error);
            nameField.className = "error";
        } else {
            nameField.className = "";
        }

        // check emaail is valid
        const emailPassed = isEmailValid(emailField.value);
        if (emailPassed.error) {
            console.log(emailPassed.error);
            appendError(document.querySelector('[for="mail"]'), emailPassed.error);
            emailField.className = "error";
        } else {
            emailField.className = "";
        }

        // check to see if atleast one activity is selected
        const activityPassed = isActivitySelected();
        if (activityPassed.error) {
            console.log(activityPassed.error);
            appendError(document.querySelector(".activities").firstElementChild, activityPassed.error);
        }

        // check to see is CC number is valid
        const ccPassed = isCcValid(ccField.value,/^\d{13,16}$/,13,16);
        if (ccPassed.error) {
            console.log(ccPassed.error);
            appendError(document.querySelector('[for="cc-num"]'), ccPassed.error);
            ccField.className = "error";
        }
        else{
            ccField.className = "";
        }
        
        // check to see if zip is valid
        const zipPassed = isCcValid(zipField.value,/^\d{5}$/,5,5);
        if (zipPassed.error) {
            console.log(zipPassed.error);
            appendError(document.querySelector('[for="zip"]'), zipPassed.error);
            zipField.className = "error";
        }
        else{
            zipField.className = "";
        }
        
        // check to see if cvv is valid
        const cvvPassed  = isCcValid(cvvField.value,/^\d{3}$/,3,3); 
        if (cvvPassed.error) {
            console.log(cvvPassed.error);
            appendError(document.querySelector('[for="cvv"]'), cvvPassed.error);
            cvvField.className = "error";
        }
        else{
            cvvField.className = "";
        }

        // if any of the fields have an error then form will not refresh
        if (namePassed.error || emailPassed.error || activityPassed.error) {
            event.preventDefault();
        }
        // if payment is credit card
        if(paymentSelect.selectedIndex == 1)
        {
            // any of the credit card fields have an error form will not refresh
            if (ccPassed.error || zipPassed.error || cvvPassed.error)
            {
                event.preventDefault();
            }
        }
    });


    //
    // Helper functions
    //

    // 
    // modify the state of one of the activities
    // 
    // activity: string
    // state: boolean
    const modifyActivityState = (activity,state) => {
        const querySelector = '[name="' +activity+ '"]';
        document.querySelector(querySelector).disabled = state;
        document.querySelector(querySelector).parentNode.className = "disabled-" + state;
    }

    // 
    // Append error message span to a label element
    // 
    // label: element
    // error: string
    const appendError = (label, error) => {
        const span = document.createElement("span");
        span.className = "error-text";
        span.textContent = " " + error;
        label.appendChild(span);
    }

    // 
    // remove errors
    // 
    const removeError = () => {
        const errorSpan = document.querySelectorAll(".error-text");

        errorSpan.forEach(function(element) {
            element.remove();
        });
    }

    // 
    // check to see if a field is empty
    // if field is empty will send object with an error message 
    // 
    // field: element
    const isFieldEmpty = (field) => {
        const val = field.value;
        if (val == 0) {
            return {pass: false, error: "Field is empty"};
        } else {
            return true;
        }
    } 

    // 
    // check to see if email is valid using a regex pattern
    // 
    // value: string
    const isEmailValid = (value) => {
        const emailPattern = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        // if field is empty return error
        if (value == 0) {
            return {pass: false, error: "Field is empty"};
        } else {
            // if value doesnt match pattern return error
            if (emailPattern.test(value) == false) {
                return {pass: false, error: "Email is not valid"};
            }
            else {
                return true;
            }
        }
    }

    // 
    // check to see if activity is selected
    // 
    const isActivitySelected = () => {

        const activitySelected = document.querySelector("input:checked");
        if(document.querySelector("input:checked")) {
            return true;
        } else {
            return {pass: false, error: "Activity not selected"};
        }
    }

    // 
    // generic function to check cc fields
    // 
    // value: string
    // pattern: regex pattern
    // minLength: int
    // maxLength: int
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