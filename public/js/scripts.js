const pallete = {};

const randomColorGenerator = () => {
  pallete.colors = [];
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16);
    const palletes = $('article').get();
    const hexText = $('h2').get();
    if ($(palletes[i]).hasClass('lock')) {
      lockedPallets(palletes, i);
    }
    if(!$(palletes[i]).hasClass('lock')) {
      unlockedPallets(palletes, hexText, color, i);
    }
  }
}

const lockedPallets = (palletes, i, ) => {
  const hexCode = convertToHex(palletes[i].style.backgroundColor);
  pallete.colors.push(hexCode);
}

const unlockedPallets = (palletes, hexText, color, i) => {
  $(palletes[i]).css('background-color', color);
  $(hexText[i]).text(color.toUpperCase());
  pallete.colors.push(color)
}

const convertToHex = rgb => {
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

const toggleLock = (event) => {
  const pallete = event.target.closest('article');
  const button = event.target.closest('button');
  $(pallete).toggleClass('lock');
  $(button).toggleClass('locked');
}

const fetchPallets = async () => {
  const response = await fetch('http://localhost:3000/api/v1/palettes');
  const palettes = await response.json();
  console.log(palettes)
}

const fetchProjects = async () => {
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  console.log(projects)
}

const setPalette = (event) => {
  pallete.name = event.target.value;
  
}

$('.palette_generator').on('click', randomColorGenerator);
$('.lock_btn').on('click', toggleLock);
$('.palette_name').on('keyup', setPalette);
$('document').ready(randomColorGenerator);