describe('Home Page', () => {

  beforeEach(() => {

    //lors du e2e test on fait une vraie requete http mais on simule la réponse de cette requete

    cy.fixture('courses.json').as('coursesJSON'); //simuli de la reponse a la requete http

    cy.server(); // ouverture du serveur qui va nous permettre d'effectuer la req http

    cy.route('/api/courses', '@coursesJSON').as('courses') // vraie requete http

    cy.visit('/'); // on se place sur la home page

  })

  it('Should display a list of courses', () => {

    cy.contains('All Courses');

    cy.wait('@courses'); // On attend que la req http se termine

    cy.get('mat-card').should('have.length', 9);

  })

  it('Should display the advanced courses', () => {

    cy.get('.mat-tab-label').should('have.length', 2); //On verifie qu'on a deux onglets

    cy.get('.mat-tab-label').last().click(); //on clique sur l onglet advanced
    // ⬆ (opération asynchrone gerer automatiquement par cypress)

    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1) // 'be.gt' === be greater than

    cy.get('.mat-tab-body-active .mat-card-title').first()
      .should('contain', 'Angular Security Course')
  })
})
