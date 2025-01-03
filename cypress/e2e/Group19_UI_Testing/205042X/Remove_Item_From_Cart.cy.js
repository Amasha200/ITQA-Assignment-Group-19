describe('Shopping Cart Tests - Remove Item', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Login
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      // Add items to the cart
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    });
  
    it('should remove an item from the shopping cart', () => {
      // Navigate to the shopping cart page
      cy.get('.shopping_cart_link').click();
  
      // Verify initial cart item count
      cy.get('.cart_item').should('have.length', 2);
  
      // Remove the first item
      cy.get('[data-test="remove-sauce-labs-backpack"]').click();
  
      // Verify that only 1 item remains
      cy.get('.cart_item').should('have.length', 1);
  
      // Verify the remaining item is correct
      cy.get('.cart_item').within(() => {
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light');
      });
    });
  });
  