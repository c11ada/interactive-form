document.addEventListener("DOMContentLoaded", () => {
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
});