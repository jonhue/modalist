import Modalist from '../src/index.js';

document.addEventListener('DOMContentLoaded', () => Modalist.init());
document.addEventListener('modalist:render', () => Modalist.init());

let modalistClassic = new Modalist({ element: document.querySelector('.modalist#classic') });
let modalistSubtitle = new Modalist({ element: document.querySelector('.modalist#subtitle') });
let modalistFullScreen = new Modalist({ element: document.querySelector('.modalist#full-screen') });
let modalistAjax = new Modalist({ element: document.querySelector('.modalist#ajax') });
