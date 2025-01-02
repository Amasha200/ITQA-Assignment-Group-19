describe('Login Form Tests', () => {
    beforeEach(() => {
      // Open the login page before each test
      cy.visit('https://www.saucedemo.com/');
    });
  
    // Test Case 1: Verify Login Form Elements
    it('Verify Login Form Elements', () => {
      cy.get('[data-test="username"]').should('be.visible'); // Verify username field
      cy.get('[data-test="password"]').should('be.visible'); // Verify password field
      cy.get('[data-test="login-button"]').should('be.visible'); // Verify login button
    });
  
    // Test Case 2: Verify Login with Valid Credentials
    it('Verify Login with Valid Credentials', () => {
      cy.get('[data-test="username"]').type('standard_user'); // Enter valid username
      cy.get('[data-test="password"]').type('secret_sauce'); // Enter valid password
      cy.get('[data-test="login-button"]').click(); // Click login button
  
      // Verify successful login
      cy.url().should('include', '/inventory.html'); // Check redirected URL
      cy.get('.inventory_list').should('exist'); // Check if products page is displayed
    });
  
    // Test Case 3: Verify Login with Invalid Credentials
    it('Verify Login with Invalid Credentials', () => {
      cy.get('[data-test="username"]').type('invalid_user'); // Enter invalid username
      cy.get('[data-test="password"]').type('invalid_password'); // Enter invalid password
      cy.get('[data-test="login-button"]').click(); // Click login button
  
      // Verify error message
      cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service');
    });
  
    // Test Case 4: Verify Password Masking
    it('Verify Password Masking', () => {
      cy.get('[data-test="password"]').type('secret_sauce'); // Enter password
      cy.get('[data-test="password"]').should('have.attr', 'type', 'password'); // Verify password is masked
    });
  
    // Test Case 5: Verify Input Validation
    it('Verify Input Validation', () => {
      cy.get('[data-test="login-button"]').click(); // Click login button without entering data
  
      // Verify error message for missing fields
      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username is required');
    });
  });
  