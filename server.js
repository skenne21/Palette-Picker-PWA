const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.locals.palettes = [{"green": "bule"}];
app.locals.projects = [{"project": "joker", pallete: ['#DF482C', '#4C53D1', '#916084', '#B176C6', '#BB63B9']}, {"project": "batman", pallete: ['#DF482C', '#4C53D1', '#916084', '#B176C6', '#BB63B9']}]


app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('hello')
});

app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes;
  if (palettes) {
    return response.status(200).json({palettes});  
  } else {
    return response.status(404).json('Not Found');
  }
});

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;
  if (projects) {
    return response.status(200).json({projects}); 
  } else {
    return response.status(404).json('Not Found');
  }
});

app.post('/api/v1/palettes', (request, response) => {
  const id = Date.now();
  const { palette } = request.body;
  if (!palette) {
    return response.status(422).send({error: 'No palette property provided'})
  } else {
    app.locals.palettes.push({id, palette});
    return response.status(201).json({id, palette});
  }
})

app.post('/api/v1/projects', (request, response) => {
  console.log(request)
  const id = Date.now();
  const { project } = request.body;
  if (!project) {
    return response.status(422).send({error: 'No project property provided'});
  } else {
    app.locals.projects.push({id, project});
    return response.status(201).json({id, project});
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})