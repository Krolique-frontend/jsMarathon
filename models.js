function makeElement (tagName, attribute, attrValue) {
    let newElement = document.createElement(tagName);
    let newAttribute = document.createAttribute(attribute);
    newAttribute.value = attrValue;
    newElement.setAttributeNode(newAttribute);

    return newElement;
}

class Fighter {
    constructor(name, hp, img, weapon) {
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
    }

    attack() {
        let string = `${this.name} Fight...`;
        console.log(string);
    }
}

class CreatePlayer {
    constructor(player, fighter) {
        this.player = player;
        this.fighter = fighter;
    }

    buildDOM() {
        let playerDiv = makeElement('div', 'class', this.player);
        let progressBarDiv = makeElement('div', 'class', 'progressbar');
        let lifeDiv = makeElement('div', 'class', 'life');
        let nameDiv = makeElement('div', 'class', 'name');
        let charDiv = makeElement('div', 'class', 'character');
        let imgElement = makeElement('img', 'src', this.fighter.img);

        nameDiv.innerHTML = this.fighter.name;
        lifeDiv.style.width = `${this.fighter.hp}%`;

        progressBarDiv.appendChild(lifeDiv);
        progressBarDiv.appendChild(nameDiv);
        charDiv.appendChild(imgElement);
        playerDiv.appendChild(progressBarDiv);
        playerDiv.appendChild(charDiv);

        document.querySelector('.arenas').appendChild(playerDiv);
    }
}