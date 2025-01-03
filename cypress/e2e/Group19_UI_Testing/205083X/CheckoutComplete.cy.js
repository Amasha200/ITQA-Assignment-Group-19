describe('Checkout with Complete Information', () => {
    it('should complete the checkout process successfully', () => {
      // Visit the website
      cy.visit('https://www.saucedemo.com/'); 
      
      // Login with valid credentials
      cy.get('[data-test="username"]').type('standard_user'); 
      cy.get('[data-test="password"]').type('secret_sauce'); 
      cy.get('[data-test="login-button"]').click(); 
      
      // Ensure that the page URL includes inventory page
      cy.url().should('include', '/inventory.html'); 
  
      // Add products to cart
      cy.get('.inventory_item').first().click(); // Click on a product
      cy.get('.btn_inventory').click(); // Add the product to the cart
      cy.get('.shopping_cart_link').click(); // Go to the cart
  
      // Proceed to checkout
      cy.get('[data-test="checkout"]').click(); 
  
      // Fill in checkout information
      cy.get('[data-test="firstName"]').type('John'); 
      cy.get('[data-test="lastName"]').type('Doe'); 
      cy.get('[data-test="postalCode"]').type('12345'); 
      cy.get('[data-test="continue"]').click(); 
  
      // Confirm checkout information
      cy.get('[data-test="finish"]').click(); 
  
      // Wait for the confirmation message to appear
      cy.get('h2.complete-header', { timeout: 10000 }) // Increased timeout to 10 seconds
        .should('be.visible')
        .and('contain', 'THANK YOU FOR YOUR ORDER!'); // Check if the message appears and contains the expected text
  
      // Verify the URL to ensure the page is the confirmation page
      cy.url().should('include', '/checkout-complete.html'); 
    });
  });
