describe('Create Book API - POST /api/books', () => {
  const baseUrl = 'http://localhost:7081';

  it('Should create a book successfully', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/books`,
      auth: {
        username: 'admin',
        password: 'password',
      },
      body: {
        title: 'The Cypress Adventure',
        author: 'Jane Doe',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('title', 'The Cypress Adventure');
      expect(response.body).to.have.property('author', 'Jane Doe');
    });
  });

  it('Should succeed for authorized user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/books`,
      auth: {
        username: 'user',
        password: 'password',
      },
      body: {
        title: 'Testing Beyond Limits',
        author: 'Alice Johnson',
      },
      failOnStatusCode: false, // Prevent failure on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.eq(201); // Assuming 201 Created is the response for a successful POST request
      expect(response.body).to.have.property('title', 'Testing Beyond Limits');
      expect(response.body).to.have.property('author', 'Alice Johnson');
    });
  });
  
  it('Should fail to create a book with missing title', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/books`,
      auth: {
        username: 'admin',
        password: 'password',
      },
      body: {
        author: 'John Smith',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('Should fail to create a book with missing author', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/books`,
      auth: {
        username: 'admin',
        password: 'password',
      },
      body: {
        title: 'Testing Beyond Limits',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

 

});
