const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

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

  describe('GET projects', () => {
    it('Get all the projects', (done) => {
      chai.request(server)
      .get('/api/v1/projects')
      .end((err, response) => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Batman is Back Baby');
        done();
      });
      
      });
    });

    describe('Get Palettes', () => {
       // it('Get all the palettes', (done) => {
       //  chai.request(server)
       //  .get('/api/v1/palettes')
       //  .end((err, response) => {
       //    response.should.be.json;
       //    response.should.have.status(200);
       //    response.body.should.be.an('array');
       //    response.body[0].should.have.property('name');
       //    response.body[0].should.equal('Black Rain');
       //    response.body[0].should.have.property('color1');
       //    response.body[0].should.equal('#DF482C');
        // response.body[0].should.have.property('color2');
        // response.body[0].should.equal('#4C53D1');
        // response.body[0].should.have.property('color3');
        // response.body[0].should.equal('#916084');
        // response.body[0].should.have.property('color4');
        // response.body[0].should.equal('#B176C6');
        // response.body[0].should.have.property('color5');
        // response.body[0].should.equal('#BB63B9');
        // response.body[0].should.have.property('project_id');
        // response.body[0].should.have.equal(0);
        // })
    })

   
  });
