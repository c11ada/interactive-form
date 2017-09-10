document.addEventListener("DOMContentLoaded", () => {
    const otherTitleLabel = document.querySelector("#other-title-label");
    const otherTitleInput = document.querySelector("#other-title");
    const themeSelect = document.querySelector("#design");
    const colorsDiv = document.querySelector("#colors-js-puns");
    const activityChk = document.querySelectorAll('[type="checkbox"]');
    let confTotal = 0;

    // <label>Your Total is $ <span>0</span></label>
    const totalDiv = document.createElement("label");
    totalDiv.id = "totalDiv";
    totalDiv.textContent = "Your Total is $ ";
    const totalSpan = document.createElement("span");
    totalSpan.id = "totalSpan";
    totalSpan.textContent= confTotal;
    totalDiv.appendChild(totalSpan);
    document.querySelector(".activities").appendChild(totalDiv);

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

    otherTitleLabel.style.display = "none";
    otherTitleInput.style.display = "none";
    colorsDiv.style.display = "none";

    const userTitle = document.querySelector("#title");

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

    activityChk.forEach(function(element) {
        element.addEventListener("change", (e) => {
            const price = e.target.getAttribute("data-price");
            const activityName = e.target.getAttribute("name");
            const isChecked = e.target.checked;

            if (isChecked) {
                totalSpan.textContent = confTotal + price;
            } else {
                totalSpan.textContent = confTotal - price;
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

});