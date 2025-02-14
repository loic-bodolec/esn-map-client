/// <reference types="cypress" />

const login = (username: string, password: string) => {
  // Visiter la page de connexion
  cy.visit('/connexion');

  // Remplir le formulaire de connexion
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);

  // Soumettre le formulaire
  cy.get('button[type="submit"]').click();

  // Vérifier la redirection vers la page /carte
  cy.url().should('include', '/carte');
};

const checkCommonElements = () => {
  // Vérifier que les éléments spécifiques sont présents sur la page /carte
  cy.get('.map-container').should('be.visible');
  cy.get('.map-filters').should('be.visible');
  cy.get('.form-control').should('have.length', 2); // Vérifie qu'il y a deux contrôles de formulaire
  cy.get('.map-filters-buttons').should('be.visible');
  cy.get('.map').should('be.visible');
  cy.get('.leaflet-marker-icon').should('have.length.greaterThan', 0); // Vérifie qu'il y a au moins un marqueur sur la carte

  // Vérifier que les éléments de navigation sont présents
  cy.get('.drawer-app-bar').should('be.visible');
  cy.get('.app-bar').should('be.visible');
  cy.get('.toolbar').should('be.visible');
  cy.get('.navbar').should('be.visible');
  cy.get('.menu-button').should('have.length.greaterThan', 0); // Vérifie qu'il y a au moins un bouton de menu
};

describe('Login and check elements on /carte', () => {
  it('should login and redirect to /carte, then check elements on desktop', () => {
    // Simuler la version desktop
    cy.viewport(1280, 720);

    // Effectuer la connexion
    login('admin', 'Admin-123456');

    // Vérifier les éléments communs
    checkCommonElements();

    // Vérifier que le drawer n'est pas visible sur desktop
    cy.get('.drawer').should('not.be.visible');
  });

  it('should login and redirect to /carte, then check elements on mobile', () => {
    // Simuler la version mobile
    cy.viewport('iphone-6');

    // Effectuer la connexion
    login('admin', 'Admin-123456');

    // Vérifier les éléments communs
    checkCommonElements();

    // Vérifier que le drawer est visible sur mobile après avoir cliqué sur l'icône de menu
    cy.get('.menu-icon').click();
    cy.get('.drawer').should('be.visible');
    cy.get('.logout-button').should('be.visible'); // Vérifie que le bouton de déconnexion est visible
  });
});
