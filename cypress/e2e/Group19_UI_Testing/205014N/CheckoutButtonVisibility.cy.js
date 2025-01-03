describe('Checkout Button Visibility in Cart', () => {
    it('should display the checkout button on the cart page after adding products to the cart', () => {
      // Visit the login page
      cy.visit('https://www.saucedemo.com/');
      
      // Log in with valid credentials
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
  
      // Add a product to the cart
      cy.get('.btn_inventory').first().click(); // Add the first item to the cart
  
      // Go to the cart page
      cy.get('.shopping_cart_link').click();
      
      // Verify that the checkout button is visible
      cy.get('.checkout_button').should('be.visible');
    });
  });
