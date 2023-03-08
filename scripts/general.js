const transformData = [
    {
        transY : 100,
        transX : 0,
        scale : 2,
        opacity : 0
    },
    {
        transY : 0,
        transX : 0,
        scale : 1,
        opacity : 1
    },
    {
        transY : -50,
        transX : 0,
        scale : 0.2,
        opacity : .5
    },
    {
        transY : -60,
        transX : 0,
        scale : 0.075,
        opacity : .1
    },
    {
        transY : -63.5,
        transX : 0,
        scale : 0.035,
        opacity : 0
    },
    {
        transY : -25,
        transX : 60,
        scale : 1,
        opacity : 1
    },

    {
        transY : -60,
        transX : 10,
        scale : 0.075,
        opacity : 0
    },
    {
        transY : -25,
        transX : -60,
        scale : 1,
        opacity : 1
    },
];

const planetNamber = document.querySelector(".planet-namber");
const planetName = document.querySelector(".planet-name");
const infoBtn = document.querySelector(".info-btn");
const closeInfoBtn = document.querySelector(".close-info");
const planetDescriptions = document.querySelectorAll(".planet-description");
const planetText = document.querySelector(".planet-text");
const planetLongDescription = document.querySelector(".planet-long-description");

const contentWrapper = document.querySelector(".content-wrapper");
const controlsWrapper = document.querySelector(".controls");
const statsWrapper = document.querySelector(".stats-wrapper");

const statsValues = document.querySelectorAll(".stat-value");
const statUnit = document.querySelector(".stat-unit");


const wrapper = document.querySelector(".wrapper");
const controls = document.querySelectorAll(".control");
const planets = document.querySelectorAll(".planet");

let currentPlanet = 0;

function setProperties(planet, i) {
    planet.style.setProperty("--trans-y", transformData[i].transY + "%");
    planet.style.setProperty("--trans-x", transformData[i].transX + "%");
    planet.style.setProperty("--scale", transformData[i].scale);
    planet.style.setProperty("--opacity", transformData[i].opacity);

    if (i == 1 || i == 2 || i == 3 || i == 5 || i == 7)
        planet.style.visibility = "visible";
    else planet.style.visibility = "hidden";
}

function updateStatistics(i) {
    statsValues[0].innerText = data[i].lightTime;
    statsValues[1].innerText = data[i].namesake;
    statsValues[2].innerText = data[i].sunDistance[0];
    statsValues[3].innerText = data[i].type;
    statsValues[4].innerText = data[i].yearLength[0];
    statsValues[5].innerText = data[i].moons;
    statUnit.innerText = data[i].yearLength[1];
}

function selectPlanet(index) {
    if (index > planets.length - 1 || index < 0) return;
    setProperties(planets[index], 1);

    if (index < planets.length - 1) {
        setProperties(planets[index + 1], 2);
        if (index < planets.length - 2)
            setProperties(planets[index + 2], 3);
    }

    for (let i = 0; i < index; i++) {
        setProperties(planets[i], 0);
    }

    for (let i = index + 3; i < planets.length; i++) {
        setProperties(planets[i], 4)
    }

    controls[currentPlanet].classList.remove("control__select");
    controls[index].classList.add("control__select");

    wrapper.style.setProperty("--color", data[index].color);



    // planet information

    let planetNameLetters = planetName.childNodes;
    let planetNameLength = planetName.innerText.length;

    for (let i = 0; i < planetNameLength; i++) {
        planetNameLetters[i].classList.add("hide");
        planetNameLetters[i].style.transitionDelay = i * 20 + "ms";
    }

    planetNamber.classList.add("hide");

    setTimeout(() => {
        let text = "";
        for (let i = 0 ; i < data[index].name.length; i++) {
            text += `<span class="hide" style="transition-delay: ${i * 20}ms">${data[index].name[i]}</span>`
        }

        planetName.innerHTML = text;

        planetNamber.innerText = index + 1;


        setTimeout(() => {
            planetNameLetters = planetName.childNodes;
            planetNameLength = planetName.innerText.length;

            for (let i = 0; i < planetNameLength; i++) 
                planetNameLetters[i].classList.remove("hide");
            planetNamber.classList.remove("hide");
        }, 100);


    }, planetName.childNodes.length * 20);


    planetDescriptions[currentPlanet].classList.add("hide");
    planetDescriptions[index].classList.remove("hide");

    planetLongDescription.innerText = data[index].longDesc;
    updateStatistics(index);

    
    currentPlanet = index;
}



for (let i = 0; i < planets.length; i++) {
    planets[planets.length - i - 1].style.zIndex = i;
    planets[i].style.setProperty("--color", data[i].color);

    controls[i].childNodes[0].innerText =  data[i].name
    controls[i].addEventListener("click", ()=> {
        selectPlanet(i);
    })

    planetDescriptions[i].innerText = data[i].shortDesc;
    planetDescriptions[i].classList.add("hide");
}





let isCapturingScroll = false; 

infoBtn.addEventListener("click", ()=> {
    isCapturingScroll = true;
    wrapper.style.cursor = "auto";
    setProperties(planets[currentPlanet], 5);

    if (currentPlanet < planets.length - 1) {
        setProperties(planets[currentPlanet + 1], 6);
        if (currentPlanet < planets.length - 2)
            setProperties(planets[currentPlanet + 2], 6);
    }


    infoBtn.classList.add("scroll__btn");

    planetNamber.classList.add("hide");

    controls.forEach((control, i) => {
        control.style.setProperty("--trans-delay", i*50+"ms")
        control.classList.add("hide");
    });

    controlsWrapper.style.setProperty("--trans-delay", controls.length * 60 + "ms");
    controlsWrapper.classList.add("hide");

    // description
    planetDescriptions[currentPlanet].classList.add("hide");


    contentWrapper.classList.add("more-info");
    contentWrapper.scrollTo(0,0);



    // scroll listener
    let isScrolled = false;
    statsWrapper.classList.add("hide");
    contentWrapper.addEventListener("scroll", () => {

        if (!isCapturingScroll) return;
        
        if (contentWrapper.scrollTop  > planetText.clientHeight / 2) {
            if (isScrolled) return;
            isScrolled = true;
            contentWrapper.scrollTo(0,planetText.scrollHeight);
            setProperties(planets[currentPlanet], 7);
            planetText.classList.add("hide");
            statsWrapper.classList.remove("hide");

        } else {
            if (!isScrolled) return;
            isScrolled = false;
            contentWrapper.scrollTo(0,0);
            setProperties(planets[currentPlanet], 5);
            planetText.classList.remove("hide");
            statsWrapper.classList.add("hide");
        }
    })
});

closeInfoBtn.addEventListener("click" , () => {
    isCapturingScroll = false;
    selectPlanet(currentPlanet);
    planetText.classList.remove("hide");
    infoBtn.classList.remove("scroll__btn");
    planetNamber.classList.remove("hide");


    controls.forEach((control, i) => {
        control.classList.remove("hide");
    });
    controlsWrapper.style.setProperty("--trans-delay", "0ms");
    controlsWrapper.classList.remove("hide");


    contentWrapper.classList.remove("more-info");
});



let touchstart = 0;
let touchend = 0;

function handleTouchs(direction) {
    if (direction) selectPlanet(currentPlanet + 1);
    else selectPlanet(currentPlanet - 1);
}

wrapper.addEventListener("touchstart", (e) => {
    touchstart = e.changedTouches[0].screenY;
});

wrapper.addEventListener("touchend", (e) => {
    touchend =  e.changedTouches[0].screenY;

    if (touchend - touchstart < 100 && touchend - touchstart > -100) return;

    if (e.target == infoBtn) return;
    if (isCapturingScroll) return;
    handleTouchs(touchend > touchstart);
});


//  mouse drag
let mousestart = 0;
let mouseend = 0;
wrapper.addEventListener("mousedown", (e) => {
    mousestart = e.screenY;
    wrapper.style.cursor = "grabbing";
});

wrapper.addEventListener("mouseup", (e) => {
    mouseend = e.screenY;
    wrapper.style.cursor = "grab";

    if (mouseend - mousestart < 100 && mouseend - mousestart > -100) return;

    if (e.target == infoBtn) return;
    if (isCapturingScroll) return;
    handleTouchs(mouseend > mousestart);
});



selectPlanet(currentPlanet);