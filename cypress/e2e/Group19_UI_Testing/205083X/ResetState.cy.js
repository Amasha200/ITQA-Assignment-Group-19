describe('Reset App State', () => {
    it('should reset the cart when the app state is reset', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Login as a standard user
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      cy.get('.inventory_item:first .btn_inventory').click(); // Add the first item to the cart
      cy.get('.shopping_cart_badge').should('contain', '1'); // Verify the cart badge shows 1
  
      cy.get('.bm-burger-button').click(); // Open the menu
      cy.get('#reset_sidebar_link').click(); // Click on reset app state
      cy.get('.shopping_cart_badge').should('not.exist'); // Ensure the cart is cleared
    });
  });
