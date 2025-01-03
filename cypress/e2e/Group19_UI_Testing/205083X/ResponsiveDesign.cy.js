describe('Responsive Design on Mobile View', () => {
    it('should adapt to the iPhone X screen size', () => {
      cy.viewport('iphone-x'); // Set viewport to iPhone X size
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').should('be.visible'); // Ensure username field is visible
      cy.get('[data-test="password"]').should('be.visible'); // Ensure password field is visible
    });
  });
