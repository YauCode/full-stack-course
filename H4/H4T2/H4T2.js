async function getHouses() {
    let url = 'talotiedot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function renderHouses() {
    // Removes previosly generated nodes (elements,housese, etc.)
    let divhouses = document.getElementById("houses");
    while (divhouses.hasChildNodes()) {
        divhouses.removeChild(divhouses.firstChild);
    }

    let houses = await getHouses();
    //console.log(houses);

    // Filter houses by size < 200 m2
    let minSize = document.getElementById("check1");
    if (minSize.checked) {
        houses = houses.filter(house => house.size < 200);
    }

    // Filter houses by price < 1000 000 euroa
    let minMillion = document.getElementById("check2");
    if (minMillion.checked) {
        houses = houses.filter(house => house.price < 1000000);
    }

    //RENDER
    let housediv = document.getElementById("houses");

    houses.forEach(house => {

        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = `../images/${house.image}`;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let koko = document.createElement('p');
        koko.innerHTML = house.size + " m2";

        let teksti = document.createElement('p');
        teksti.className = 'text';
        teksti.innerHTML = house.text;

        let hinta = document.createElement('p');
        let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
        hinta.innerHTML = numberstr + " euroa";


        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(koko);
        housecontainer.appendChild(teksti);
        housecontainer.appendChild(hinta);


        housediv.appendChild(housecontainer);
    });
}

renderHouses();



// Add Event Listener if checkboxes changes (checked, unchecked)
checkOptions.addEventListener("change", () => {
    renderHouses();
}
);

