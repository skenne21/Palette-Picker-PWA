
exports.seed = function(knex, Promise) {
  
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Batman is Back Baby'
        }, 'id')
        .then( project => {
          return knex('palettes').insert([
            { 
              name: 'Black Rain',
              color1:'#DF482C',
              color2:'#4C53D1',
              color3:'#916084',
              color4:'#B176C6',
              color5:'#BB63B9',
              project_id: project[0] 
            },{
              name: 'Jokers Happy Place',
              color1:'#206802',
              color2:'#E08E15',
              color3:'#CA9867',
              color4:'#449CBA',
              color5:'#928242',
              project_id: project[0]
          }
        ])
      })
      .then(() => console.log('Seeding complete!!!'))
      .catch( error => console.log(`Error seeding data:${error}`))
    ])
  })
  .catch(error => console.log(`Error seeding data: ${error}`))
};

