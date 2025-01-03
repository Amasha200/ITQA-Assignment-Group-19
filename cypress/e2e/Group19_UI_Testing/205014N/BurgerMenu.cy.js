describe('Burger Menu Functionality', () => {
    it('should display and function correctly when the burger menu is clicked', () => {
      // Visit the login page
      cy.visit('https://www.saucedemo.com/');
      
      // Log in with valid credentials
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
  
      // Verify the inventory page is loaded by checking the URL
      cy.url().should('include', '/inventory.html');
  
      // Click on the burger menu to open the side menu
      cy.get('#react-burger-menu-btn').click();
      
      // Verify that the side menu is visible
      cy.get('.bm-menu').should('be.visible');
      
      // Verify that the menu contains expected options
      cy.get('.bm-item-list').should('contain', 'All Items');  // Inventory page link
      cy.get('.bm-item-list').should('contain', 'About');     // About page link
      cy.get('.bm-item-list').should('contain', 'Logout');    // Logout option
  
      // Verify that clicking on "All Items" navigates to the inventory page
      cy.get('.bm-item-list').contains('All Items').click();
      cy.url().should('include', '/inventory.html');  // Ensure it navigates back to the inventory page
  
      // Close the burger menu by clicking the close button
      cy.get('#react-burger-cross-btn').click();
  
      // Verify that the burger menu is closed
      cy.get('.bm-menu').should('not.be.visible');
    });
  });
