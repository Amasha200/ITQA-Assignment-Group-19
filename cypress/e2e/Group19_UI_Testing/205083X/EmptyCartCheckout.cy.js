describe('Error on Empty Cart Checkout', () => {
    it('should not allow checkout if the cart is empty', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      cy.get('.shopping_cart_link').click(); // Click on cart
      cy.get('[data-test="checkout"]').should('not.exist'); // Verify checkout button does not appear
    });
  });
