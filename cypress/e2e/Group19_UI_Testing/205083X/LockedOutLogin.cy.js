describe('Verify Locked-Out User Login', () => {
    it('Should display an error for locked-out user', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('locked_out_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
    });
  });
