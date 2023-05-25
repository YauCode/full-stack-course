async function getNames() {
    let url = 'nameslist.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function renderNames(input) {
    // Removes previosly generated nodes (elements,names, etc.)
    clearList();

    let names = await getNames();
    // console.log(names);

    // CHECK INPUT STRING
    let newNames = new Array;
    let partName;
    for (let i = 0; i < names.length; i++) {
        partName = names[i].slice(0, input.length)
        if (partName.toLowerCase() == input.toLowerCase() && partName != []) {
            newNames.push(names[i]);
        }
    }

    // RENDER NAMES
    let namesdiv = document.getElementById("names");
    newNames.forEach(name => {
        let oneName = document.createElement('p');
        // oneName.setAttribute('id', `name${newNames.indexOf(name)}`);
        oneName.innerHTML = name;
        namesdiv.appendChild(oneName);
    });

    //No Names Found Message
    if (partName.toLowerCase() != input.toLowerCase() && partName != [] && namesdiv.hasChildNodes() == false) {
        let notFound = document.createElement('h3');
        namesdiv.appendChild(notFound);
        notFound.innerHTML = "- No names found! Try type again. -";
    }
}

//EVENT LISTENER
namesText.addEventListener("keyup", (event) => {

    let eventValue = event.which;

    //ESCAPE
    if (eventValue == 27) {
        namesText.value = "";
        clearList();
        return;
    }

    //ARROW DOWN PRESSED
    if (eventValue == 40) {
        if (arrow < (document.getElementById("names").childElementCount - 1)) {
            arrow++;
            makeArrowDown(arrow);
        }
        return;
    }

    //ARROW UP PRESSED
    if (eventValue == 38) {
        if (arrow > 0) {
            arrow--;
            makeArrowUP(arrow);
        }
        return;
    }

    //ENTER PRESSED
    if (eventValue == 13 && names.hasChildNodes()) {
        if (arrow >= 0 && arrow <= (document.getElementById("names").childElementCount)) {
            namesText.value = document.getElementById("names").children[arrow].innerText;
            clearList();
        }
        return;
    }

    renderNames(event.currentTarget.value);
    arrow = -1;
}
);


// Removes previosly generated nodes (elements,names, etc.)
function clearList() {
    let divnames = document.getElementById("names");
    while (divnames.hasChildNodes()) {
        divnames.removeChild(divnames.firstChild);
    }

}

// Variable wich used for navigation (arrowUP, arrowDOWN) and choosing (ENTER)
let arrow = -1;

// Highlights the one below name when pressed ARROW DOWN
function makeArrowDown(arrow) {
    let chosen = document.getElementById("names").children[arrow];
    chosen.style.backgroundColor = "yellow";
    if (arrow > 0) {
        let notchosen = document.getElementById("names").children[arrow - 1];
        notchosen.style.backgroundColor = null;
    }
}

// Highlights the one above name when pressed ARROW UP
function makeArrowUP(arrow) {
    let chosen = document.getElementById("names").children[arrow];
    chosen.style.backgroundColor = "yellow";
    if (arrow > -1) {
        let notchosen = document.getElementById("names").children[arrow + 1];
        notchosen.style.backgroundColor = null;
    }
}
