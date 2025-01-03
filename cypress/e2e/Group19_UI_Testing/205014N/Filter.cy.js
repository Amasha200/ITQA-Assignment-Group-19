describe('Filter Z-A Functionality', () => {
    it('should sort the products in descending order (Z to A) when the Z-A filter is applied', () => {
      cy.visit('https://www.saucedemo.com/'); // Visit the website
      cy.get('[data-test="username"]').type('standard_user'); // Enter valid username
      cy.get('[data-test="password"]').type('secret_sauce'); // Enter valid password
      cy.get('[data-test="login-button"]').click(); // Click the login button
      cy.url().should('include', '/inventory.html'); // Verify inventory page is loaded
  
      // Open the sorting dropdown and select "Price (high to low)" or a Z-A option if available
      cy.get('.product_sort_container').select('za'); // Select Z-A from the dropdown (replace with correct option)
  
      // Capture the list of product names before and after sorting
      let productNamesBeforeSort = [];
      let productNamesAfterSort = [];
  
      // Get product names before sorting
      cy.get('.inventory_item_name').each(($el) => {
        productNamesBeforeSort.push($el.text()); // Add product names to array
      }).then(() => {
        // Sort the product names array in descending (Z-A) order for validation
        let sortedProductNames = productNamesBeforeSort.slice().sort().reverse();
  
        // Verify the product names are sorted in descending order (Z-A)
        cy.get('.inventory_item_name').each(($el, index) => {
          productNamesAfterSort.push($el.text()); // Capture product names after sorting
          expect(productNamesAfterSort[index]).to.equal(sortedProductNames[index]); // Compare with the expected sorted list
        });
      });
    });
  });
  