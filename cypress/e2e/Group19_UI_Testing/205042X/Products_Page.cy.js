describe('Products Page Tests', () => {
    beforeEach(() => {
      // Log in with valid credentials
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Enter valid username
      cy.get('[data-test="password"]').type('secret_sauce'); // Enter valid password
      cy.get('[data-test="login-button"]').click(); // Click login button
    });
  
    it('Verify Page Elements on Products Page', () => {
      // Verify header and logo
      cy.get('.header_secondary_container').should('be.visible');
      cy.get('.app_logo').should('be.visible');
  
      // Verify the product list
      cy.get('.inventory_list').should('be.visible');
      cy.get('.inventory_item').each((product) => {
        cy.wrap(product).find('.inventory_item_name').should('be.visible');
        cy.wrap(product).find('.inventory_item_price').should('be.visible');
      });
  
      // Verify the cart icon is visible
      cy.get('.shopping_cart_link').should('be.visible');
  
      // Verify the cart badge (if present)
      cy.get('.shopping_cart_link')
        .find('[data-test="shopping-cart-badge"]')
        .should('be.visible')
        .and('contain', '1'); // Assuming there is 1 item in the cart
    });
  });
  