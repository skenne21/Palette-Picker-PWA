const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('Should return the homepage with an HTML document', () => {
    return chai.request(server)
    .get('/')
    .then( response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch( error => {
      throw error;
    })
  });

  it('Should return 404 if the request is not found', () => {
    return chai.request(server)
    .get('/thisisfake')
    .then(response => {
      response.should.have.status(404)
    })
    .catch( error => {
      throw error;
    })
  })
});

describe('API Routes', () => {
  beforeEach( (done) => {
    database.migrate.rollback()
      .then( () => {
        database.migrate.latest()
      .then( () => {
        return database.seed.run()
        .then( () => {
          done();
        })
      })
    })
  });


  describe('GET api/v1/projects', () => {
    it('Get all the projects', () => {
      return chai.request(server)
      .get('/api/v1/projects')
      .then(response => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Batman is Back Baby');
        response.body[0].should.property('created_at');
        response.body[0].should.property('updated_at');
      })
      .catch( error => {
        throw error;
      }); 
    });
  });

  describe('POST api/v1/projects', () => {
    it('Should post new projects', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send({ name: 'Joker is no Joke'})
      .then( response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.property('id');
        response.body.id.should.equal(2);
      })
      .catch( error => {
        throw error;
      })
    })

    it('Throw an 422 status if its missing name', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send({})
      .then( response => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Expected fromat: {name: <string>}. You\'re missing a name property')
      })
      .catch( error => {
        throw error;
      })
    })
  })

  describe('Get api/v1/palettes', () => {
    it('Get all the palettes', () => {
      return chai.request(server)
      .get('/api/v1/palettes')
      .then(response => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Black Rain');
        response.body[0].should.have.property('color1');
        response.body[0].color1.should.equal('#DF482C');
        response.body[0].should.have.property('color2');
        response.body[0].color2.should.equal('#4C53D1');
        response.body[0].should.have.property('color3');
        response.body[0].color3.should.equal('#916084');
        response.body[0].should.have.property('color4');
        response.body[0].color4.should.equal('#B176C6');
        response.body[0].should.have.property('color5');
        response.body[0].color5.should.equal('#BB63B9');
        response.body[0].should.have.property('project_id');
        response.body[0].project_id.should.have.equal(1);
      })
      .catch( error => {
        throw error
      });
    }); 
  });

  describe('GET /api/v1/palettes/:id', () => {
    it.skip('should return the palette with specfic id', () => {
      return chai.request(server)
      .get('api/v1/palettes/1')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Black Rain');
      })
      .catch(err => {
        throw err;
      });
    });

    it.skip('Should send a status of 404 of the id does not exist', () => {
      return chai.request(server)
      .get('api/v1/palettes/3')
      .then( response => {
        response.should.have.status(404);
        response.should.be.a('object');
        response.body.error.should.equal('Could not find palette with id 3');
      })
      .catch(error => {
        throw error;
      })
    })
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('Should delete end point with specfic id', () => {
      return chai.request(server)
      .delete('/api/v1/palettes/1')
      .then( response => {
        response.should.have.status(204);
      })
      .catch( error => {
        throw error;
      })
    });

    it('Should send a status of 404, if Id does not match palettes', () => {
      return chai.request(server)
      .delete('/api/v1/palettes/10')
      .then( response => {
        response.should.have.status(404);
      })
      .catch( error => {
        throw error;
      });
    });
  });

  describe('POST /api/v1/palettes', () => {
    it('Should post palettes to the database', () => {
      return chai.request(server)
      .post('/api/v1/palettes')
      .send({
        name: 'Jokers Happy Place',
        colors: ['green', 'blue', 'pink', 'red', 'white'],
        project_id: 1
      })
      .then( response => {
        response.should.have.status(201)
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(3)
      })
      .catch( error => {
        throw error;
      });
    });

    it('Should send 422 if missing required params', () => {
      return chai.request(server)
      .post('/api/v1/palettes')
      .send({name: 'hello', project_id: 1})
      .then( response => {
        response.should.have.status(422)
        response.body.should.be.a('object')
        response.body.error.should.equal('Expected format: { name: <String>, project_id: <number>, colors: <array> }. You\'re missing a "colors" property.')
      })
      .catch( error => {
        throw error;
      })
    })
  });
 
});
