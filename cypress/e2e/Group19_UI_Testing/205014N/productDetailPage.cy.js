describe('Product Detail Page', () => {
    it('should display the product details when a user clicks on a product', () => {
      cy.visit('https://www.saucedemo.com/'); // Visit the website
      cy.get('[data-test="username"]').type('standard_user'); // Enter valid username
      cy.get('[data-test="password"]').type('secret_sauce'); // Enter valid password
      cy.get('[data-test="login-button"]').click(); // Click the login button
      cy.url().should('include', '/inventory.html'); // Verify inventory page is loaded
  
      // Click on the first product to view its details
      cy.get('.inventory_item').first().click(); // Click the first product
  
      // Wait for the product details modal or page element to appear
      cy.get('.inventory_details_name', { timeout: 10000 }).should('be.visible'); // Wait for product name to appear
      cy.get('.inventory_details_desc', { timeout: 10000 }).should('be.visible'); // Wait for product description to appear
      cy.get('.inventory_details_price', { timeout: 10000 }).should('be.visible'); // Wait for product price to appear
  
      // Ensure that the "Add to Cart" button is visible and clickable
      cy.get('.btn_inventory').should('be.visible').and('not.be.disabled'); // Verify the "Add to Cart" button
    });
  });
  