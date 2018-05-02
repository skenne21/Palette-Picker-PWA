const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const enviroment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[enviroment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

// app.use((request, response, next) => {
//   response.header('Access-Control-Allow-Origin', '*')
//   next()
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({error})
    });
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  if (!project.name) {
    return response
      .status(422)
      .send({error:`Expected fromat: {name: <string>}. You're missing a name property`});
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ 
        name: project.name,
        id: project[0]
      })
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

// app.get('/api/v1/palettes', (request, response) => {
  
// });



// app.post('/api/v1/palettes', (request, response) => {
//   const id = Date.now();
//   const { palette } = request.body;
//   if (!palette) {
//     return response.status(422).send({error: 'No palette property provided'})
//   } else {
//     app.locals.palettes.push({id, palette});
//     return response.status(201).json({id, palette});
//   }
// })



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})