describe('Sauce Demo Footer Social Media Links', () => {
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
  
    it('TC_01: Verify the functionality of the Facebook link in the footer', () => {
      // Step 4: Scroll down to the footer area
      cy.scrollTo('bottom'); // Ensure the footer is in view
  
      // Step 5: Click on the Facebook icon
      cy.get('[data-test="social-facebook"]')
        .should('be.visible') // Ensure the Facebook link is visible
        .invoke('removeAttr', 'target') // Remove 'target=_blank' to open in the same tab
        .click();
  
      // Step 6: Verify the Facebook link opens to the correct URL
      cy.url().should('include', 'https://www.facebook.com/saucelabs');
    });
  });