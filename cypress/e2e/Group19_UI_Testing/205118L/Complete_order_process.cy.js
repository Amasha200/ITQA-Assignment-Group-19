/// <reference types="cypress" />

describe('SauceDemo Order Completion Test', () => {
    it('Completes an order and validates Thank You message', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('#user-name').type('standard_user'); // Enter username
      cy.get('#password').type('secret_sauce');  // Enter password
      cy.get('#login-button').click();          // Click login button
  
      cy.url().should('include', '/inventory.html');
  
      // Add an item to the cart and proceed to checkout
      cy.get('#add-to-cart-sauce-labs-backpack').click(); 
      cy.get('.shopping_cart_link').click();             
      cy.url().should('include', '/cart.html');
      cy.get('#checkout').click();
  
      // Fill out checkout information
      cy.url().should('include', '/checkout-step-one.html');
      cy.get('#first-name').type('John');
      cy.get('#last-name').type('Doe');
      cy.get('#postal-code').type('12345');
      cy.get('#continue').click();
  
      // Confirm checkout step two and finish
      cy.url().should('include', '/checkout-step-two.html');
      cy.get('#finish').click();
  
      // Validate Thank You message
      cy.url().should('include', '/checkout-complete.html');
      cy.get('[data-test="checkout-complete-container"] h2.complete-header')
        .should('have.text', 'Thank you for your order!'); // Adjusted for case sensitivity
    });
  });