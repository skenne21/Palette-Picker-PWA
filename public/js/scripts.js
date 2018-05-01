const randomColorGenerator = () => {
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16);
    const palletes = $('article').get();
    const hexText = $('h2').get();
    if(!$(palletes[i]).hasClass('lock')) {
      $(palletes[i]).css('background-color', color);
      $(hexText[i]).text(color.toUpperCase());
    }
  }
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

$('.palette_generator').on('click', randomColorGenerator);
$('.lock_btn').on('click', toggleLock);
$('document').ready(randomColorGenerator);
