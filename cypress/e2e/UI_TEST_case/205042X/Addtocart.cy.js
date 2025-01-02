describe('Add to Cart Feature', () => {
    beforeEach(() => {
      // Visit the Sauce Demo site and login
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Replace with valid credentials
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('should add a product to the cart', () => {
      // Check that the page loads with products
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
  
      // Click on the first "Add to Cart" button
      cy.get('.btn_inventory').first().click();
  
      // Verify that the cart icon shows 1 item
      cy.get('.shopping_cart_badge').should('have.text', '1');
  
      // Navigate to the cart page
      cy.get('.shopping_cart_link').click();
  
      // Verify that the product is in the cart
      cy.get('.cart_item').should('have.length', 1);
    });
  
    it('should remove a product from the cart', () => {
      // Add a product to the cart
      cy.get('.btn_inventory').first().click();
  
      // Verify the cart shows 1 item
      cy.get('.shopping_cart_badge').should('have.text', '1');
  
      // Go to the cart page
      cy.get('.shopping_cart_link').click();
  
      // Remove the product
      cy.get('.cart_button').click();
  
      // Verify that the cart is empty
      cy.get('.cart_item').should('not.exist');
    });
  });
  