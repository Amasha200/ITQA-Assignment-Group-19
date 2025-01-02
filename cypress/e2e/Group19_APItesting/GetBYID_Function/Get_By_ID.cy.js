describe('Get Book by ID API - Validate Response Codes and Data', () => {
    const baseUrl = 'http://localhost:7081/api/books'; // Base URL
  
    // Test case for fetching a book by a valid ID with admin login
    it('Should return the correct book when a valid ID is provided as admin', () => {
      const validBookId =1; 
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${validBookId}`,
        auth: {
          username: 'admin',
          password: 'password',
        },
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('id', validBookId); 
        expect(response.body).to.have.property('title'); 
        expect(response.body).to.have.property('author'); 
      });
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Test case for fetching a book by a valid ID with user login, expecting to get the book (fixing the bug)
    it('Should return the correct book when a valid ID is provided as a user (bug fix)', () => {
      const validBookId = 1; 
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${validBookId}`,
        auth: {
          username: 'user', 
          password: 'password', 
        },
        failOnStatusCode: false, 
      }).then((response) => {
        
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', validBookId); 
        expect(response.body).to.have.property('title'); 
        expect(response.body).to.have.property('author'); 
      });
    });

  ///////////////////////////////////////////////////////////////////////////////////////////////////

    // Test case for fetching a book with an invalid ID format (400)
    it('Should return 400 when an invalid book ID format is provided', () => {
      const invalidBookId = 'abc'; 
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${invalidBookId}`,
        auth: {
          username: 'admin',
          password: 'password',
        },
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(400); 
        expect(response.body).to.not.be.empty;
        expect(response.body).to.have.property('message'); 
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
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(400); 
        expect(response.body).to.have.property('message'); 
      });
    });
  });
  