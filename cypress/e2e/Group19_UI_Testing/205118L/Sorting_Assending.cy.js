describe('SauceDemo - Sorting Test', () => {
    before(() => {
      // Navigate to the SauceDemo login page
      cy.visit('https://www.saucedemo.com/');
    });
  
    it('Logs in and verifies product sorting A to Z', () => {
      // Step 1: Enter username
      cy.get('[data-test="username"]').type('standard_user'); // Select by data-test attribute
  
      // Step 2: Enter password
      cy.get('[data-test="password"]').type('secret_sauce'); // Select by data-test attribute
  
      // Step 3: Click login button
      cy.get('[data-test="login-button"]').click(); // Select by data-test attribute
  
      // Step 4: Verify redirection to inventory page
      cy.url().should('include', '/inventory.html'); // Assert URL contains '/inventory'
  
      // Step 5: Select "Name (A to Z)" from the dropdown
      cy.get('[data-test="product-sort-container"]').select('az'); // Select by data-test attribute
  
      // Step 6: Validate products are sorted alphabetically (A to Z)
      let productNames = [];
      cy.get('.inventory_item_name') // Select by class for product names
        .each(($el) => {
          productNames.push($el.text());
        })
        .then(() => {
          const sortedNames = [...productNames].sort(); // Sort the names alphabetically
          expect(productNames).to.deep.equal(sortedNames); // Validate sorting matches
        });
    });
  });