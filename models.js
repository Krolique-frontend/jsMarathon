const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function makeElement(tagName, attribute, attrValue) {
    let newElement = document.createElement(tagName);
    let newAttribute = document.createAttribute(attribute);

    newAttribute.value = attrValue;
    newElement.setAttributeNode(newAttribute);

    return newElement;
}

function createReloadButton() {
    const div = makeElement('div', 'class', 'reloadWrap');
    const button = makeElement('button', 'class', 'button resButton');

    button.innerHTML = 'restart';
    div.appendChild(button);

    button.onclick = event => {
        event.preventDefault();

        restart();
    };

    return button;
}

function restart() {
    player1.hp = 100;
    player2.hp = 100;

    player1.renderHP();
    player2.renderHP();

    document.querySelector('.winnerBar').classList.toggle('show');

    document.querySelector('.control').removeChild(document.querySelector('.resButton'));

    chatLog('start', player1, player2);
    chatLog();
}

function random(num) {
    return Math.floor(Math.random() * num) + 1;
}

function changeHP(value) {
    this.hp -= value;
}

function renderHP() {
    elHP.call(this).style.width = `${this.hp}%`;
}

function elHP() {
    return document.querySelector(`.${this.player} .life`);
}

function chatLog(type, offender, defender, damage) {
    const chat = document.querySelector('.chat');
    const p = makeElement('p', 'class', 'chatMsg');
    const time = new Date().toLocaleTimeString();

    let string;

    switch (type) {
        case 'hit':
            string = logs
                .hit[random(logs.hit.length - 1)]
                .replace('[playerDefence]', defender.name)
                .replace('[playerKick]', offender.name);

            p.innerHTML = `>>${time} ${string} -${damage} [${defender.hp}/100]`;
            chat.insertBefore(p, chat.children[0]);
            break;

        case 'defence':
            string = logs
                .defence[random(logs.defence.length - 1)]
                .replace('[playerDefence]', defender.name)
                .replace('[playerKick]', offender.name);

            p.innerHTML = `>>${time} ${string}`;
            chat.insertBefore(p, chat.children[0]);
            break;

        case 'start':
            string = logs
                .start
                .replace('[player2]', defender.name)
                .replace('[player1]', offender.name)
                .replace('[time]', time);

            p.innerHTML = `>>${time} ${string}`;
            chat.insertBefore(p, chat.children[0]);
            break;

        case 'end':
            string = logs
                .end[random(logs.end.length - 1)]
                .replace('[playerLose]', defender)
                .replace('[playerWins]', offender);

            p.innerHTML = `>>${time} ${string}`;
            chat.insertBefore(p, chat.children[0]);
            break;

        case 'draw':
            p.innerHTML = `>>${time} ${logs.draw}`;
            chat.insertBefore(p, chat.children[0]);
            break;

        default:
            chat.insertAdjacentHTML('afterbegin', '<span>> </span>')
    }

}

function createPlayer() {
    let playerDiv = makeElement('div', 'class', this.player);
    let progressBarDiv = makeElement('div', 'class', 'progressbar');
    let lifeDiv = makeElement('div', 'class', 'life');
    let nameDiv = makeElement('div', 'class', 'name');
    let charDiv = makeElement('div', 'class', 'character');
    let imgElement = makeElement('img', 'src', this.img);

    nameDiv.innerHTML = this.name;
    lifeDiv.style.width = `${this.hp}%`;

    progressBarDiv.appendChild(lifeDiv);
    progressBarDiv.appendChild(nameDiv);
    charDiv.appendChild(imgElement);
    playerDiv.appendChild(progressBarDiv);
    playerDiv.appendChild(charDiv);

    return playerDiv;
}

function playerAttack() {
    const attack = {};

    for (let item of formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = random(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function enemyAttack() {
    const hit = ATTACK[random(3) - 1];
    const defence = ATTACK[random(3) - 1];

    return {
        value: random(HIT[hit]),
        hit,
        defence
    };
}

function fight() {
    const player = playerAttack();
    const enemy = enemyAttack();

    if (enemy.hit === player.defence && player.hit === enemy.defence) {
        chatLog('defence', player2, player1, 0);
        chatLog('defence', player1, player2, 0);
        chatLog();
    }

    else if (player.hit === enemy.defence && enemy.hit !== player.defence) {
        crit(enemy);
        player1.changeHP(enemy.value);
        player1.renderHP();

        chatLog('hit', player2, player1, enemy.value);
        chatLog('defence', player1, player2, 0);
        chatLog();
    }

    else if (player.hit !== enemy.defence && enemy.hit === player.defence) {
        crit(player);
        player2.changeHP(player.value);
        player2.renderHP();

        chatLog('defence', player2, player1, 0);
        chatLog('hit', player1, player2, player.value);
        chatLog();
    }

    else if (player.hit !== enemy.defence && enemy.hit !== player.defence) {
        crit(player);
        crit(enemy);

        player1.changeHP(enemy.value);
        player2.changeHP(player.value);

        player1.renderHP();
        player2.renderHP();

        chatLog('hit', player1, player2, player.value);
        chatLog('hit', player2, player1, enemy.value);
        chatLog();
    }

    if (player2.hp <= 0 || player1.hp <= 0) {
        player1.hp <= 0 ? player1.hp = 0 : player2.hp = 0;

        player1.renderHP();
        player2.renderHP();

        player1.hp <= 0
            ? chatLog('end', player2.name, player1.name)
            : chatLog('end', player1.name, player2.name);

        chatLog();

        let winner;
        if (player1.hp <= 0 ) winner = player2;
        else if (player2.hp <= 0) winner = player1;
        else chatLog('draw');

        document.querySelector('.winnerBar').classList.toggle('show');
        winner ? document.querySelector('.winnerBar').innerHTML = `${winner.name} wins` : null;

        document.querySelector('.control').appendChild(createReloadButton());
    }
}

function crit(obj) {
    return random(1000) > 950 ? obj.value *= 2 : null;
}

class Fighter {
    constructor(char, playerNum) {
        this.player = playerNum;
        this.name = char.name;
        this.hp = char.hp;
        this.img = char.img;
        this.weapon = char.weapon;
        this.changeHP = changeHP;
    }

    attack() {
        let string = `${this.name} Fight...`;
        console.log(string);
    }

    renderHP() {
        renderHP.call(this);
    }
}