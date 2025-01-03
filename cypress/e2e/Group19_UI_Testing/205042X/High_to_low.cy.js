describe('Product Sorting Feature - High to Low', () => {
    beforeEach(() => {
      // Visit the Sauce Demo site and login
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Replace with valid credentials
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('should sort products by Price - High to Low', () => {
      // Select "Price (high to low)" from the sorting dropdown
      cy.get('[data-test="product-sort-container"]').select('hilo');
  
      // Verify the products are sorted by price (high to low)
      cy.get('.inventory_item_price')
        .then(($prices) => {
          const prices = [...$prices].map((el) =>
            parseFloat(el.innerText.replace('$', ''))
          );
          const sortedPrices = [...prices].sort((a, b) => b - a);
          expect(prices).to.deep.equal(sortedPrices);
        });
    });
  });