const palette = {};

const randomColorGenerator = () => {
  palette.colors = [];
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    createPalettes(color, i)
  } 
}

const createPalettes = (color, i) => {
  const palletes = $('article').get();
    const hexText = $('h2').get();
    if ($(palletes[i]).hasClass('lock')) {
      lockedPallete(palletes, i);
    }
    if(!$(palletes[i]).hasClass('lock')) {
      unlockedPallete(palletes, hexText, color, i);
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
  $('.select_project').empty();
  projects.forEach( project => {
    $('.select_project').prepend(`
      <option id='${project.id}'value='${project.name}'>${project.name}</option>`)
  });
}

const renderProjects = (projects, paletes) => {
  $('.projects').empty();
  const createdProjects = projects.map(project => {
    return (`
      <article>
        <h3>${project.name}</h3>
        <div>${renderExamplePalettes(project.id, paletes)}</div>
      </article>
    `)
  })
  $('.projects').append(createdProjects)
}

const renderExamplePalettes = ( id, paletes) => {
  const projectsPalettes = paletes.filter( palete => palete.project_id === id);
  return projectsPalettes.map( (palette, index) => {
    const hexCodes = createHexCodeArray(palette);
    const createdPalettes = createMiniPalettes(hexCodes)
    return(`
      <div class='palette_wrapper' id='${palette.id}'>
      <p>${palette.name}</p>
      <button class='trash-can'></button>
        ${createdPalettes}
      </div>
    `)
  }).join('')
}

const createHexCodeArray = palette => {
  return Object.keys(palette).reduce((hexCodes, key) => {
    if(key.includes('color')) {
      hexCodes.push(palette[key]);
    }
    return hexCodes;
  }, []);
}

const createMiniPalettes = hexCodes => {
  return hexCodes.map(hex => {
      return(`
        <div class="mini-pallete" style="background-color:${hex};">
          <h4>${hex}</h4>
        </div>
      `)
    }).join('')
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
  return palettes;
}

const fetchProjects = async () => {
  const response = await fetch('http://localhost:3000/api/v1/projects');
  const projects = await response.json();
  return projects;
}

const saveProjects = async () => {
  const name = $('.project-name').val();
  resetInput($('.project-name')); 
  const request = {
    method: 'POST',
    body: JSON.stringify({name}),
    headers: { 'Content-Type': 'application/json'}
  }
  const projects = await checkProjects(name);
  if (projects.length >= 1) {
    const response = await fetch('http://localhost:3000/api/v1/projects', request );
    await fetchPaletesAndProjects();
  }
}

const checkProjects = async (name) => {
  try {
    const projects = await fetchProjects();
    const isNamed = projects.find(project => project.name === name)
    if (isNamed !== undefined) {
      return( alert(`${name} is Already Saved!`));
    } else {
      return projects;
    }
  } catch (error) {
    console.log(error);
  }
  
}

const resetInput = input => {
  $(input).val('');
}

const savePalettes = async () => {
  palette.name = $('.palette_name').val();
  palette.project_id= $('.select_project')[0].selectedOptions[0].id;
  resetInput($('.palette_name'));
  try {
      const response = await fetch('http://localhost:3000/api/v1/palettes', {
      method: 'POST',
      body: JSON.stringify(palette),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch ( error ) {
    console.log(error);
  } 
  await fetchPaletesAndProjects();
}

const removePalette = async () => {
  const parent = $(event.target).closest('.palette_wrapper')
  const id = parent[0].id
  deletePalete(id)
  $(parent).remove();
}

const deletePalete = async id => {
  const userResponse = {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: { 'Content-Type': 'application/json'}
  }
  try {
    await fetch(`http://localhost:3000/api/v1/palettes/${id}`, userResponse);
  } catch (error) {
    console.log(error)
  }
}

const showPalettes = () => {
  
}


$('.palette_generator').on('click', randomColorGenerator);
$('.lock_btn').on('click', toggleLock);
$('.save-project').on('click', saveProjects);
$('.save_palette').on('click', savePalettes);
$('.projects').on('click', '.trash-can', removePalette);
$('.projects').on('click', '.palette_wrapper', showPalettes);

$(document).ready(() => {
  randomColorGenerator(),
  fetchPaletesAndProjects()
});

// notes to finsish project:
// need to have articles display colors when clicked either palette or name
// need to refactor getting palettes for specfic project using :id fetch call instead
// test
// clean up ui