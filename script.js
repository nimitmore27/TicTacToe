let r1 = document.getElementsByClassName('r1');
let r2 = document.getElementsByClassName('r2');
let r3 = document.getElementsByClassName('r3');
let box = document.getElementsByClassName('box');

let board = [[r1[0], r1[1], r1[2]], [r2[0], r2[1], r2[2]], [r3[0], r3[1], r3[2]]];

let lock = document.getElementById('lock');

let announce = document.getElementById('announce');
let p1inp = document.getElementById('player1');
let p2inp = document.getElementById('player2');

let cross = '<i class="fa-solid fa-x"></i>';
let zero = '<i class="fa-solid fa-o"></i>';

let player1;
let player2;
let turn = 1;

function start() {
    lock.style.display = 'none';
    p1inp.readOnly = true, p2inp.readOnly = true;
    player1 = p1inp.value == '' ? 'Player 1' : p1inp.value;
    player2 = p2inp.value == '' ? 'Player 2' : p2inp.value;
    announce.innerHTML = `${player1}'s Turn`;
    document.getElementById("playbtn").style.display = 'none';
    GameReset(1);
}
function move(pos) {
    let flag = 1;
    if (box[pos].innerHTML == cross || box[pos].innerHTML == zero) return
    if (turn == 1) box[pos].innerHTML = cross, turn = 2, announce.innerHTML = `${player2}'s Turn`;
    else box[pos].innerHTML = zero, turn = 1, announce.innerHTML = `${player1}'s Turn`;
    for (let j = 0; j < 9; j++)
        if (box[j].innerHTML == '') flag = 0;
    if (flag == 1) {
        announce.innerHTML = "Match Tie";
        GameReset();
    } else {
        let winner = check();
        if (winner == cross) {
            announce.innerHTML = `${player1} Winner`;
            GameReset();
        }
        if (winner == zero) {
            announce.innerHTML = `${player2} Winner`;
            GameReset();
        }
    }
}
function check() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0].innerHTML == board[i][1].innerHTML && board[i][1].innerHTML == board[i][2].innerHTML && board[i][0].innerHTML != '' && board[i][1].innerHTML != '' &&board[i][2].innerHTML != '')
            return board[i][0].innerHTML;
        if (board[0][i].innerHTML == board[1][i].innerHTML && board[1][i].innerHTML == board[2][i].innerHTML && board[0][i].innerHTML != '' && board[1][i].innerHTML != '' &&board[2][i].innerHTML != '')
            return board[0][i].innerHTML;
    }
    if ((board[0][0].innerHTML == board[1][1].innerHTML && board[1][1].innerHTML == board[2][2].innerHTML) || (board[0][2].innerHTML == board[1][1].innerHTML && board[1][1].innerHTML == board[2][0].innerHTML))
        return board[1][1].innerHTML;
}
function GameReset(rs) {
    if (rs == 0 || rs == 1) {
        for (let r = 0; r < 9; r++)
            box[r].innerHTML = '';
        if (rs == 1) return;
        announce.innerHTML = '';
    }
    p1inp.readOnly = false, p2inp.readOnly = false;
    p1inp.value = '', p2inp.value = '';
    document.getElementById("playbtn").style.display = 'block';
    lock.style.display = 'Flex';
    turn = 1;
}