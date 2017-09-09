document.addEventListener("DOMContentLoaded", () => {
    const otherTitleLabel = document.querySelector("#other-title-label");
    const otherTitleInput = document.querySelector("#other-title");
    const themeSelect = document.querySelector("#design");
    const colorsDiv = document.querySelector("#colors-js-puns");

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

});