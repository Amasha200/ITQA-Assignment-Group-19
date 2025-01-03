describe('Product Sorting Feature', () => {
    beforeEach(() => {
      // Visit the Sauce Demo site and login
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user'); // Replace with valid credentials
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
  
    it('should sort products by Name (A to Z)', () => {
      // Select "Name (A to Z)" from the sorting dropdown
      cy.get('[data-test="product-sort-container"]').select('az');
  
      // Verify the products are sorted by name (A to Z)
      cy.get('.inventory_item_name')
        .then(($names) => {
          const names = [...$names].map((el) => el.innerText);
          const sortedNames = [...names].sort();
          expect(names).to.deep.equal(sortedNames);
        });
    });
  
    it('should sort products by Name (Z to A)', () => {
      // Select "Name (Z to A)" from the sorting dropdown
      cy.get('[data-test="product-sort-container"]').select('za');
  
      // Verify the products are sorted by name (Z to A)
      cy.get('.inventory_item_name')
        .then(($names) => {
          const names = [...$names].map((el) => el.innerText);
          const sortedNames = [...names].sort().reverse();
          expect(names).to.deep.equal(sortedNames);
        });
    });
  });
  