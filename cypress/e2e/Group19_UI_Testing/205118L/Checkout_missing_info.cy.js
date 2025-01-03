describe('Checkout Missing Information', () => {
    beforeEach(() => {
      // Step 1: Visit the Sauce Demo website and log in
      cy.visit('https://www.saucedemo.com/');
      cy.get('#user-name').type('standard_user'); // Username
      cy.get('#password').type('secret_sauce');  // Password
      cy.get('#login-button').click();           // Log in
  
      // Step 2: Add an item to the cart and proceed to checkout
      cy.get('.inventory_item').first().find('button').click(); // Add the first product
      cy.get('.shopping_cart_link').click(); // Navigate to the cart
    });
  
    it('should display error when checkout information is missing', () => {
      // Step 3: Click the "Checkout" button
      cy.get('[data-test="checkout"]').click(); // Target the checkout button
  
      // Step 4: Fill only the first and last name, leaving the postal code empty
      cy.get('[data-test="firstName"]').type('John');    // Fill in the First Name
      cy.get('[data-test="lastName"]').type('Doe');      // Fill in the Last Name
      cy.get('[data-test="continue"]').click();          // Click the "Continue" button
  
      // Step 5: Validate the error message is displayed
      cy.get('[data-test="error"]')                      // Target the error element
        .should('be.visible')                           // Assert it is visible
        .and('contain.text', 'Error: Postal Code is required'); // Validate the error text
    });
  });