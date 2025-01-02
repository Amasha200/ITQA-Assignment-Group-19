describe('Update Book API - Validate Response Codes and Data', () => {
  const baseUrl = 'http://localhost:7081/api/books'; // Base URL for the API

  // Test case for updating a book with a valid ID and valid data
  it('Should update the book details when a valid ID and valid data are provided', () => {
    const validBookId = 3; // Assuming a book with ID 3 exists
    const updatedBookData = {
      id: validBookId, // Ensure ID is included in the body
      title: 'Testing sei',
      author: 'Alice Johnson123',
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
    const validBookId = 3; // Assuming a book with ID 3 exists
    const invalidUpdateData = {
      id: validBookId, // Ensure ID is included in the body
      title: 'Testing uytr',
      author: 'Alice Johnson123',
      newParameter: 'InvalidParam', // Adding a parameter that is not part of the expected schema
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

  // Test case for updating a book with only the author changed (should fail if title is not updated)
  it('Should fail when updating only the author without changing the title', () => {
    const validBookId = 3; // Assuming a book with ID 3 exists
    const invalidUpdateData = {
      id: validBookId, // Ensure ID is included in the body
      title: 'Testing Beyond Likjjkkmsfssoj9', // Title should remain the same
      author: 'Updated Author', // Only author is updated
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${validBookId}`,
      auth: {
        username: 'admin', // Admin login credentials
        password: 'password',
      },
      body: invalidUpdateData, // Only updating the author
      failOnStatusCode: false, // Allow non-2xx responses for assertions
    }).then((response) => {
      expect(response.status).to.eq(400); // Expected status code for Bad Request
      expect(response.body).to.contain('Author cannot be updated without changing title'); // Adjust based on actual API message
    });
  });

  // Test case for updating with empty author and title (should fail if empty values are not allowed)
  it('Should fail when updating with empty author and title fields', () => {
    const validBookId = 3; // Assuming a book with ID 3 exists
    const emptyUpdateData = {
      id: validBookId, // Ensure ID is included in the body
      title: '', // Empty title
      author: '', // Empty author
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${validBookId}`,
      auth: {
        username: 'admin', // Admin login credentials
        password: 'password',
      },
      body: emptyUpdateData, // Empty author and title
      failOnStatusCode: false, // Allow non-2xx responses for assertions
    }).then((response) => {
      expect(response.status).to.eq(400); // Expected status code for Bad Request
      expect(response.body).to.contain('Title and Author cannot be empty'); // Adjust based on actual API message
    });
  });
});
