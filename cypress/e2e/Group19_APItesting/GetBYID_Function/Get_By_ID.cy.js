describe('Get Book by ID API - Validate Response Codes and Data', () => {
    const baseUrl = 'http://localhost:7081/api/books'; // Base URL
  
    // Test case for fetching a book by a valid ID with admin login
    it('Should return the correct book when a valid ID is provided as admin', () => {
      const validBookId =1; // Assuming a book with ID 34 exists
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${validBookId}`,
        auth: {
          username: 'admin',
          password: 'password',
        },
        failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
      }).then((response) => {
        expect(response.status).to.eq(200); // Expected status code for successful retrieval
        expect(response.body).to.have.property('id', validBookId); // Ensure correct book ID is returned
        expect(response.body).to.have.property('title'); // Ensure title exists
        expect(response.body).to.have.property('author'); // Ensure author exists
      });
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Test case for fetching a book by a valid ID with user login, expecting to get the book (fixing the bug)
    it('Should return the correct book when a valid ID is provided as a user (bug fix)', () => {
      const validBookId = 1; // Assuming a book with ID 34 exists
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${validBookId}`,
        auth: {
          username: 'user', // Login as a regular user
          password: 'password', // Correct user password
        },
        failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
      }).then((response) => {
        // This should be a success, not a 403
        expect(response.status).to.eq(200); // Expected status code for successful retrieval
        expect(response.body).to.have.property('id', validBookId); // Ensure correct book ID is returned
        expect(response.body).to.have.property('title'); // Ensure title exists
        expect(response.body).to.have.property('author'); // Ensure author exists
      });
    });

  ///////////////////////////////////////////////////////////////////////////////////////////////////

    // Test case for fetching a book with an invalid ID format (400)
    it('Should return 400 when an invalid book ID format is provided', () => {
      const invalidBookId = 'abc'; // Invalid ID format (non-numeric)
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${invalidBookId}`,
        auth: {
          username: 'admin',
          password: 'password',
        },
        failOnStatusCode: false, // Allow non-2xx responses for assertions
      }).then((response) => {
        expect(response.status).to.eq(400); // Expected status code for Bad Request
        expect(response.body).to.not.be.empty; // Ensure the body is not empty
        expect(response.body).to.have.property('message'); // Ensure the error message property exists
      });
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Test case for no book ID provided (400)
    it('Should return 400 when no book ID is provided', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/`,
        auth: {
          username: 'admin',
          password: 'password',
        },
        failOnStatusCode: false, // Allow non-2xx responses for assertions
      }).then((response) => {
        expect(response.status).to.eq(400); // Expected status code for Bad Request
        expect(response.body).to.have.property('message'); // Ensure the error message exists
      });
    });
  });
  