describe('Product Sorting Feature - Low to High', () => {
    beforeEach(() => {
      // Visit the Sauce Demo site and login
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); 
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('should sort products by Price - Low to High', () => {
      // Select "Price (low to high)" from the sorting dropdown
      cy.get('[data-test="product-sort-container"]').select('lohi');
  
      // Verify the products are sorted by price (low to high)
      cy.get('.inventory_item_price')
        .then(($prices) => {
          const prices = [...$prices].map((el) =>
            parseFloat(el.innerText.replace('$', ''))
          );
          const sortedPrices = [...prices].sort((a, b) => a - b);
          expect(prices).to.deep.equal(sortedPrices);
        });
    });
  });
