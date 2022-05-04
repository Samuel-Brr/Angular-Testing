describe('Home Page', () => {

  it('Should display a list of courses', () => {

    //lors du e2e test on fait une vraie requete http mais on simule la réponse de cette requete

    cy.fixture('courses.json').as('coursesJSON'); //simuli de la reponse a la requete http

    cy.server(); // ouverture du serveur qui va nous permettre d'effectuer la req http

    cy.route('/api/courses', '@coursesJSON').as('courses') // vraie requete http

    cy.visit('/'); // on se place sur la home page

    cy.contains('All Courses');

    cy.wait('@courses'); // On attend que la req http se termine

    cy.get('mat-card').should('have.length', 9);

  })

})
