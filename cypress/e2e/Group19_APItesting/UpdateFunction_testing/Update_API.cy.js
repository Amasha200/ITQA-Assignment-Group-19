describe('Update Book API - Validate Response Codes and Data', () => {
  const baseUrl = 'http://localhost:7081/api/books'; // Base URL for the API

  // Test case for updating a book with a valid ID and valid data
  it('Should update the book details when a valid ID and valid data are provided', () => {
    const validBookId = 5; // Assuming a book with ID 5 exists
    const updatedBookData = {
      id: validBookId, // Ensure ID is included in the body
      title: 'Madol Duwa123',
      author: 'Martin Wickramasinge123',
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${validBookId}`,
      auth: {
        username: 'admin', // Admin login credentials
        password: 'password',
      },
      body: updatedBookData, // Include the ID in the body as well
      failOnStatusCode: false, // Allow non-2xx responses for assertions
    }).then((response) => {
      expect(response.status).to.eq(200); // Expected status code for a successful update
      expect(response.body).to.have.property('id', validBookId); // Ensure the correct book ID is returned
      expect(response.body).to.have.property('title', updatedBookData.title); // Ensure title is updated
      expect(response.body).to.have.property('author', updatedBookData.author); // Ensure author is updated
    });
  });

  // Test case for updating a book with an invalid parameter
  it('Should fail when updating a book with an unexpected parameter', () => {
    const validBookId = 6; // Assuming a book with ID 6 exists
    const invalidUpdateData = {
      id: validBookId, // Ensure ID is included in the body
      title: 'Testing uytrdddd123',
      author: 'Alice Johnson12333',
      newParameter: 'InvalidParam12', // Adding a parameter that is not part of the expected schema
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${validBookId}`,
      auth: {
        username: 'admin', // Admin login credentials
        password: 'password',
      },
      body: invalidUpdateData, // Include the invalid parameter
      failOnStatusCode: false, // Allow non-2xx responses for assertions
    }).then((response) => {
      expect(response.status).to.eq(400); // Expected status code for Bad Request
      expect(response.body).to.contain('Invalid parameters'); // Check that the error message indicates invalid parameters
    });
  });

  // Updated test case: Should allow updating only the author without changing the title
  it('Should update the author field without requiring the title to be updated', () => {
    const validBookId = 7; // Assuming a book with ID 4 exists
    const updateAuthorOnlyData = {
      id: validBookId, // Ensure ID is included in the body
      title: 'de', // Title remains unchanged
      author: 'Updated Author_updated1234', // Author is updated
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${validBookId}`,
      auth: {
        username: 'admin', // Admin login credentials
        password: 'password',
      },
      body: updateAuthorOnlyData, // Only updating the author
      failOnStatusCode: false, // Allow non-2xx responses for assertions
    }).then((response) => {
      expect(response.status).to.eq(200); // Expected status code for a successful update
      expect(response.body).to.have.property('id', validBookId); // Ensure the correct book ID is returned
      expect(response.body).to.have.property('title', updateAuthorOnlyData.title); // Title should remain unchanged
      expect(response.body).to.have.property('author', updateAuthorOnlyData.author); // Ensure author is updated
    });
  });

  // Test case for updating with empty author and title (should fail if empty values are not allowed)
  it('Should fail when the "title" and "author" fields are not strings', () => {
    const validBookId = 8; // Assuming a book with ID 4 exists
    const invalidUpdateData = {
      id: validBookId, // Ensure ID is included in the body
      title: 12345678, // Invalid type for title (number instead of string)
      author: false, // Invalid type for author (boolean instead of string)
    };
  
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${validBookId}`,
      auth: {
        username: 'admin', // Admin login credentials
        password: 'password',
      },
      body: invalidUpdateData, // Include invalid types
      failOnStatusCode: false, // Allow non-2xx responses for assertions
    }).then((response) => {
      expect(response.status).to.eq(400); // Expected status code for Bad Request
      expect(response.body).to.contain('Invalid data type'); // Adjust based on actual API message
    });
  });
  
});
