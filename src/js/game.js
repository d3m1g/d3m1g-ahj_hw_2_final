
import goblin from '../img/goblin.png';

export default class Game {
 constructor(str, index) {
  this.element = document.querySelector(str);
  this.boardSize = index ** 2;
  if (this.element === null) throw new Error('Field not found');
  this.sucessConuter = 0;
  this.failCounter = 0;
  this.clicked = false;
 }

 init() {
  this.element.style = `max-width: ${Math.sqrt(this.boardSize) * 100}px; min-height: ${Math.sqrt(this.boardSize) * 100}px`;
  this.createCells();
  this.insertImg();
  this.showCountters();
  this.click();
  this.gamePlay();
 }

 createCells() {
  for (let i = 1; i <= this.boardSize; i += 1) {
   const cell = document.createElement('div');
   cell.classList.add('game-field-cell');
   this.element.insertAdjacentElement('afterbegin', cell);
  }
 }

 insertImg() {
  const index = Math.floor(Math.random() * (this.boardSize - 1));
  const img = document.createElement('img');
  img.classList.add('game-field-cell-img');
  img.src = goblin;
  img.alt = 'голова гоблина';
  const arr = [...document.querySelectorAll('.game-field-cell')];
  arr[index].insertAdjacentElement('afterbegin', img);
 }

 removeImg() {
  this.img = document.querySelector('.game-field-cell-img');
  this.img.remove();
 }

 gameOver() {
  this.showCountters();
  this.failCounter = 0;
  this.sucessConuter = 0;
  alert('Game over!');
  this.showCountters();
  this.gamePlay();
 }

 click() {
  this.element.addEventListener('click', (e) => {
   const item = e.target;
   if (item.classList.contains('game-field-cell-img')) {
    item.remove();
    this.clicked = true;
   }
   if (item.classList.contains('game-field-cell')) return false;
  });
 }

 gamePlay() {
  const id = setInterval(() => {
   if (this.clicked) {
    this.sucessConuter += 1;
    this.insertImg();
    this.clicked = false;
   } else if (!this.clicked) {
    this.removeImg();
    this.failCounter += 1;
    this.insertImg();
   }
   this.showCountters();
   if (this.failCounter === 5) {
    this.gameOver();
    window.clearInterval(id);
   }
  }, 1000);
 }

 showCountters() {
  const fails = document.querySelector('.counter-fail');
  const success = document.querySelector('.counter-success');
  fails.textContent = `Fails: ${this.failCounter}`;
  success.textContent = `Success: ${this.sucessConuter}`;
 }
}