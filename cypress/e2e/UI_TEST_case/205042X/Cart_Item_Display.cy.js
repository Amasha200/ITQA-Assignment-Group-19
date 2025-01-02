describe('Shopping Cart Tests - Cart Item Display', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Login
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      // Add items to the cart
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    });
  
    it('should display the correct items in the shopping cart', () => {
      // Navigate to the shopping cart page
      cy.get('.shopping_cart_link').click();
  
      // Verify cart item count
      cy.get('.cart_item').should('have.length', 2);
  
      // Verify item details
      cy.get('.cart_item').first().within(() => {
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
        cy.get('.inventory_item_price').should('contain', '$29.99');
      });
  
      cy.get('.cart_item').last().within(() => {
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light');
        cy.get('.inventory_item_price').should('contain', '$9.99');
      });
    });
  });