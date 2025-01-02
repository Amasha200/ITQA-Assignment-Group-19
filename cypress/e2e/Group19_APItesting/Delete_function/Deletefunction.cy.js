describe('DELETE /api/books/{id} - Authorization Check', () => {
    const bookIdToDelete = 22; 
  
    it('should allow admin to delete a book with status code 200', () => {
      cy.request({
        method: 'DELETE',
        url: `http://localhost:7081/api/books/${bookIdToDelete}`,
        auth: {
          username: 'admin',
          password: 'password',
        },
        failOnStatusCode: false,  
      }).then((response) => {
        cy.log(`Response Body: ${JSON.stringify(response.body)}`); 
        cy.log(`Response Status: ${response.status}`);  
  
        ///////////////////////////////////////////////////////////////////////////


        expect(response.status).to.eq(200, 'Admin should be able to delete the book');
  
        
        if (response.status === 403) {
          cy.log('Forbidden access - possibly an authorization issue');
          cy.log('Response Body:', JSON.stringify(response.body));
        }
      });
    });
  
    it('should forbid a regular user from deleting a book with status code 403', () => {
      cy.request({
        method: 'DELETE',
        url: `http://localhost:7081/api/books/${bookIdToDelete}`,
        auth: {
          username: 'user',
          password: 'password',
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(`Response Body: ${JSON.stringify(response.body)}`);
        cy.log(`Response Status: ${response.status}`);
  
        ////////////////////////////////////////////////////////////////////////

        expect(response.status).to.eq(403, 'Regular user should not be able to delete the book');
      });
    });


    it('should allow a regular user to delete a book with status code 200 (Manual Book ID)', () => {
        const manualBookIdToDelete = prompt('Enter the book ID to delete:'); 
        
        cy.request({
          method: 'DELETE',
          url: `http://localhost:7081/api/books/${manualBookIdToDelete}`,
          auth: {
            username: 'user',
            password: 'password',
          },
          failOnStatusCode: false,  
        }).then((response) => {
          cy.log(`Response Body: ${JSON.stringify(response.body)}`);
          cy.log(`Response Status: ${response.status}`);
        
        
          expect(response.status).to.eq(200, 'Regular user should be able to delete the book');
          
          
          cy.request({
            method: 'GET',
            url: `http://localhost:7081/api/books/${manualBookIdToDelete}`,
            failOnStatusCode: false,  
          }).then((getResponse) => {
            
            if (getResponse.status === 404) {
              cy.log('Book successfully deleted and no longer exists');
            } else if (getResponse.status === 403) {
              cy.log('User is not authorized to access the deleted book (403).');
              expect(getResponse.status).to.eq(403, 'User should not be able to access the deleted book');
            } else {
              cy.log('Unexpected status code: ' + getResponse.status);
            }
          });
        });
      });
      
});
