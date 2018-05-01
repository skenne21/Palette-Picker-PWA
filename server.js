const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.locals.palettes = [{"green": "bule"}];
app.locals.projects = [{"green": "bule"}, {"green": "bule"}]


app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})