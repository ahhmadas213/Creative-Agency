// check if there is locacl storage cololr option
let mainColors = localStorage.getItem("color_option");
// console.log(mainColors);

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);

    // check for active clas
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // add active class
        if (element.dataset.color === mainColors)
            element.classList.add("active");
    });
}

// random background option
let backgroundPlay = true;

// varibal to control interval 
let backgroundInterval;

// check if theres's local stroge randome background
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background not empty 
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundPlay = true;

    } else {
        backgroundPlay = false;
    }

    // remove active class from all span
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// let settingBox = document.querySelector(".setting-box")
document.querySelector(".toggle-settings .gear-icon").onclick = function () {

    // toggle for spin on self
    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open-box");

};

// switch colorls
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all ist items
colorsLi.forEach(li => {

    // click on everغ list iteme
    li.addEventListener("click", (e) => {
        // set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // add active class to target element
        handleActive(e);

        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);

    });
});

// random background option
let backgroundOptions = document.querySelectorAll(".random-backgrounds span");

// loop on all span 
backgroundOptions.forEach(sp => {
    sp.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundPlay = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);

        } else {
            backgroundPlay = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }

    });
});

//select landing page element 
let landingPage = document.querySelector(".landing-page");

// change bakground size on scorll
window.addEventListener("scroll", function () {
    landingPage.style.backgroundSize = 160 - +window.pageYOffset / 12 + '%';
    landingPage.style.opacity = 1 - +window.pageYOffset / 700 + '';
});

// get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

// function to show random background
function randomizeImgs() {
    if (backgroundPlay === true) {
        // get randoum number 
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
        }, 10000);
    }
}

randomizeImgs();

// select skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // skills offset top 
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scrolltop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop >= ((skillsOffsetTop + skillsOuterHeight) - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// creat popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {
        // creat overlay div
        let overlay = document.createElement("div");
        // add a class name to overlay
        overlay.className = "popup-overlay";
        // append overlay to body
        document.body.appendChild(overlay);

        // creat popup box
        let popupBox = document.createElement("div");
        // add a class name to the popup
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            // creat heading
            let imgheading = document.createElement("h3");

            // creat imgText
            let imgText = document.createTextNode(img.alt);

            // append text to the img
            imgheading.appendChild(imgText);

            // append heanding to popupbox
            popupBox.appendChild(imgheading);
        }

        // creat the image
        let popupImage = document.createElement("img");
        // change the img source
        popupImage.src = img.src;

        // add img to popup-box 
        popupBox.appendChild(popupImage);
        // append popup box to the body
        document.body.appendChild(popupBox);

        // creat close button 
        let closeButton = document.createElement("span");

        // create close button text
        let closeButtonText = document.createTextNode("x");

        // append text to button
        closeButton.appendChild(closeButtonText);

        // add class name to close button
        closeButton.className = "close-button";

        // append close button to popbox
        popupBox.appendChild(closeButton);

    });

});

// close popup

document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {

        // remove the curent popup
        e.target.parentNode.remove();

        // reomve overlay
        document.querySelector(".popup-overlay").remove();
    }
});


// select all links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links li a");


function scorllTo(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scorllTo(allBullets);
scorllTo(allLinks);


// handle active state 
function handleActive(ev) {
    //remove active class from all 
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // add active class to self
    ev.target.classList.add("active");
}


// // showe nav bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== "null") {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullet_option", "block");

        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullet_option", "none");

        }

        handleActive(e);
    });
});

// reset option
document.querySelector(".reset-options").onclick = function () {
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    // reload window
    window.location.reload();


};

// tugle menu 

let toggleBtn = document.querySelector(".header-area .toggle-menu")
let tLinks = document.querySelector(".header-area .links")

toggleBtn.onclick = function(e) {

    // stop propagation
    e.stopPropagation()

    // toggle class 
    this.classList.toggle("menu-active")

    // toggle class menu-active
    tLinks.classList.toggle("open")

}

// click anywhere outside menu
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        // check if menu is open
        if (tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")
        }
    }
})

// stop propagation on menu
tLinks.onclick = function(e) {
    e.stopPropagation()
}