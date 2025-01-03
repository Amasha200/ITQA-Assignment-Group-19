describe('Sauce Demo Footer Social Media Link - LinkedIn', () => {
    before(() => {
      // Step 1: Visit the Sauce Demo website
      cy.visit('https://www.saucedemo.com');
  
      // Step 2: Log in with valid credentials
      cy.get('#user-name', { timeout: 10000 })
        .should('be.visible')
        .type('standard_user');
      cy.get('#password', { timeout: 10000 })
        .should('be.visible')
        .type('secret_sauce');
      cy.get('#login-button', { timeout: 10000 })
        .should('be.visible')
        .click();
  
      // Step 3: Verify login success by checking the URL
      cy.url().should('include', '/inventory');
    });
  
    it('TC_03: Verify the functionality of the LinkedIn link in the footer', () => {
      // Scroll to the footer area
      cy.scrollTo('bottom');
  
      // Click on the LinkedIn icon
      cy.get('[data-test="social-linkedin"]')
        .should('be.visible') // Ensure the LinkedIn link is visible
        .invoke('removeAttr', 'target') // Remove 'target=_blank' to open in the same tab
        .click();
  
      // Verify the LinkedIn link opens to the correct URL
      cy.url().should('include', 'https://www.linkedin.com/company/sauce-labs/');
    });
  });