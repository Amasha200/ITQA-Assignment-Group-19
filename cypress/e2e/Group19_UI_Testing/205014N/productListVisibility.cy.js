describe('Product List Visibility', () => {
    it('should display a list of products on the inventory page after login', () => {
      // Visit the login page
      cy.visit('https://www.saucedemo.com/');
      
      // Log in with valid credentials
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
  
      // Verify the inventory page is loaded by checking the title
      cy.url().should('include', '/inventory.html');
      
      // Verify that the product list is visible
      cy.get('.inventory_item').should('have.length.greaterThan', 0); // Ensure that at least one product is listed
  
      // Verify that each product has a name, description, and price visible
      cy.get('.inventory_item').each(($el) => {
        cy.wrap($el).find('.inventory_item_name').should('be.visible');
        cy.wrap($el).find('.inventory_item_desc').should('be.visible');
        cy.wrap($el).find('.inventory_item_price').should('be.visible');
      });
    });
  });
