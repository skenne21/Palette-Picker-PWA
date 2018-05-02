const pallete = {};
const projects = [];
const project = {}

const randomColorGenerator = () => {
  pallete.colors = [];
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    const palletes = $('article').get();
    const hexText = $('h2').get();
    if ($(palletes[i]).hasClass('lock')) {
      lockedPallete(palletes, i);
    }
    if(!$(palletes[i]).hasClass('lock')) {
      unlockedPallete(palletes, hexText, color, i);
    }
  }
  console.log(pallete.colors)
}

const lockedPallete = (palletes, i) => {
  const hexCode = $(palletes[i]).find('h2').text()
  pallete.colors.push(hexCode);
}

const unlockedPallete = (palletes, hexText, color, i) => {
  $(palletes[i]).css('background-color', color);
  $(hexText[i]).text(color);
  pallete.colors.push(color)
}

// const convertToHex = rgb => {
//  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
//  return (rgb && rgb.length === 4) ? "#" +
//   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
//   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
//   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
// }

const toggleLock = event => {
  const pallete = event.target.closest('article');
  const button = event.target.closest('button');
  $(pallete).toggleClass('lock');
  $(button).toggleClass('locked');
}

const renderSelectOptions = projects => {
  projects.forEach( project => {
    $('.select_project').prepend(`
      <option value='${project.name}'>${project.name}</option>`)
  });
}

// const renderProjects = projects => {
//   projects.forEach( project => {
//     $('.projects').append(`
//       <article class='project'>
//         <h3>${project.project}</h3>
//         // <section class="project-palletes">
//         //   <div class="mini-pallete" style="background-color:${project.pallete[0]};">
//         //     <h4>${project.pallete[0]}</h4>
//         //   </div>
//         //   <div class="mini-pallete" style="background-color:${project.pallete[1]};">
//         //     <h4>${project.pallete[1]}</h4>
//         //   </div>
//         //   <div class="mini-pallete" style="background-color:${project.pallete[2]};">
//         //     <h4>${project.pallete[2]}</h4>
//         //   </div>
//         //   <div class="mini-pallete" style="background-color:${project.pallete[3]};">
//         //     <h4>${project.pallete[3]}</h4>
//         //   </div>
//         //   <div class="mini-pallete" style="background-color:${project.pallete[4]};">
//         //     <h4>${project.pallete[4]}</h4>
//         //   </div>
//         / </section>
//       </article>
//     `)
//   });
// }


const fetchPallets = async () => {
  const response = await fetch('http://localhost:3000/api/v1/palettes');
  const palettes = await response.json();
}

const fetchProjects = async () => {
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  console.log(projects)
  // renderProjects(projects);
  renderSelectOptions(projects);
}

const saveProjects = async () => {
  project.name = $('.project-name').val(); 

  const response = await fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify(project),
    headers: {'Content-Type' : 'application/json'}
  });
  const data = response.json();
  console.log(data)
  $('.project-name').val('')
}

$('.palette_generator').on('click', randomColorGenerator);
$('.lock_btn').on('click', toggleLock);
$('.save-project').on('click', saveProjects);

$(document).ready(() => {
  randomColorGenerator(),
  fetchProjects()
});