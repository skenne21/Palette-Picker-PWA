const pallete = {};
const projects = [];
const project = {}

const randomColorGenerator = () => {
  pallete.colors = [];
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16);
    const palletes = $('article').get();
    const hexText = $('h2').get();
    if ($(palletes[i]).hasClass('lock')) {
      lockedPallete(palletes, i);
    }
    if(!$(palletes[i]).hasClass('lock')) {
      unlockedPallete(palletes, hexText, color, i);
    }
  }
}

const lockedPallete = (palletes, i) => {
  const hexCode = convertToHex(palletes[i].style.backgroundColor);
  pallete.colors.push(hexCode);
}

const unlockedPallete = (palletes, hexText, color, i) => {
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

const toggleLock = event => {
  const pallete = event.target.closest('article');
  const button = event.target.closest('button');
  $(pallete).toggleClass('lock');
  $(button).toggleClass('locked');
}

const renderSelectOptions = projects => {
  projects.forEach( project => {
    $('.select_project').prepend(`
      <option value='${project.project}'>${project.project}</option`)
  });
}


const fetchPallets = async () => {
  const response = await fetch('http://localhost:3000/api/v1/palettes');
  const palettes = await response.json();
  console.log(palettes)
}

const fetchProjects = async () => {
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  renderSelectOptions(projects.projects);
}



// const saveProjects = async () => {
//   const project = $('.project-name').val();

//   const response = await fetch('http://localhost:3000/api/v1/projects', {
//     method: 'POST',
//     body: JSON.stringify({project}),
//     headers: {'Content-Type' : 'application/json'}
//   });
//   console.log(response)
//   const data = response.json();
//   console.log(data);
//   $('.project-name').val('')
// }

$('.palette_generator').on('click', randomColorGenerator);
$('.lock_btn').on('click', toggleLock);
// $('.save-project').on('click', saveProjects);
;
$(document).ready(() => {
  randomColorGenerator(),
  fetchProjects()
});