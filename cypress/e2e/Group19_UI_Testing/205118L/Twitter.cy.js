describe('Verify the functionality of the Twitter link in the footer', () => {
    before(() => {
      // Precondition: Log in with valid credentials
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Replace with valid credentials
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('should verify the Twitter link in the footer', () => {
      // Step 1: Scroll to the footer area
      cy.scrollTo('bottom');
  
      // Step 2: Verify the Twitter link is correct
      cy.get('[data-test="social-twitter"]')
        .should('have.attr', 'href', 'https://x.com/saucelabs')
        .and('have.attr', 'target', '_blank');
  
      // Optional: Click the link and ensure it opens correctly in a new tab
      cy.get('[data-test="social-twitter"]').then((link) => {
        const url = link.prop('href');
        cy.request(url).then((response) => {
          expect(response.status).to.eq(200); // Verify the link is accessible
        });
      });
    });
  });