const palette = {};

const randomColorGenerator = () => {
  palette.colors = [];
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
  
}

const lockedPallete = (palletes, i) => {
  const hexCode = $(palletes[i]).find('h2').text()
  palette.colors.push(hexCode);
}

const unlockedPallete = (palletes, hexText, color, i) => {
  $(palletes[i]).css('background-color', color);
  $(hexText[i]).text(color);
  palette.colors.push(color)
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
      <option id='${project.id}'value='${project.name}'>${project.name}</option>`)
  });
}

const renderProjects = (projects, paletes) => {
  const createdProjects = projects.map(project => {
    return (`
      <article>
        <h3>${project.name}</h3>
        <div>${renderMiniPalettes(project.id, paletes)}</div>
      </article>
    `)
  })
  $('.projects').append(createdProjects)
}

const renderMiniPalettes = ( id, paletes) => {
  const projectsPalettes = paletes.filter( palete => palete.project_id === id)
  
  return projectsPalettes;
}


const fetchPaletesAndProjects = async () => {
  const paletes = await fetchPaletes();
  const projects = await fetchProjects();
  renderProjects(projects, paletes);
  renderSelectOptions(projects);
}

const fetchPaletes = async () => {
  const response = await fetch('http://localhost:3000/api/v1/palettes');
  const palettes = await response.json();
  return palettes
}

const fetchProjects = async () => {
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  return projects
}

const saveProjects = async () => {
  const name = $('.project-name').val(); 
  const response = await fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({name}),
    headers: { 'Content-Type': 'application/json'}
  });
  $('.project-name').val('')
}

const savePalettes = async () => {
  palette.name = $('.palette_name').val();
  palette.project_id= $('.select_project')[0].selectedOptions[0].id
  try {
      const response = await fetch('http://localhost:3000/api/v1/palettes', {
      method: 'POST',
      body: JSON.stringify(palette),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch ( error ) {
    console.log(error)
  } 
}

$('.palette_generator').on('click', randomColorGenerator);
$('.lock_btn').on('click', toggleLock);
$('.save-project').on('click', saveProjects);
$('.save_palette').on('click', savePalettes);

$(document).ready(() => {
  randomColorGenerator(),
  fetchPaletesAndProjects()
});