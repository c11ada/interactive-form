document.addEventListener("DOMContentLoaded", () => {

document.querySelector("#other-title-label").style.display = "none";
document.querySelector("#other-title").style.display = "none";

const userTitle = document.querySelector("#title");

userTitle.addEventListener("change", (e) => {
    const titleSelected = e.target.value;

    if (titleSelected === "other") {
        document.querySelector("#other-title-label").style.display = "";
        document.querySelector("#other-title").style.display = ""; 
    }
    else {
        document.querySelector("#other-title-label").style.display = "none";
        document.querySelector("#other-title").style.display = "none"; 
    }
});

});