describe('GET /api/books - Get All Books', () => {
    const baseUrl = 'http://localhost:7081/api/books';
  
    const validateBooksResponse = (response) => {
      expect(response.status).to.eq(200, 'Expected status code 200');
      expect(response.body).to.be.an('array', 'Expected response to be an array');
      response.body.forEach((book) => {
        expect(book).to.have.property('id').that.is.a('number');
        if (book.title === null) {
          cy.log(`Book with ID ${book.id} has a null title.`);
        } else {
          expect(book.title).to.be.a('string').and.not.be.empty;
        }
        if (book.author === null) {
          cy.log(`Book with ID ${book.id} has a null author.`);
        } else {
          expect(book.author).to.be.a('string').and.not.be.empty;
        }
      });
    };
  
    it('should allow a regular user to retrieve the list of books with status code 200', () => {
      cy.request({
        method: 'GET',
        url: baseUrl,
        auth: {
          username: 'user',
          password: 'password',
        },
      }).then(validateBooksResponse);
    });
  
    it('should allow an admin to retrieve the list of books with status code 200', () => {
      cy.request({
        method: 'GET',
        url: baseUrl,
        auth: {
          username: 'admin',
          password: 'password',
        },
      }).then(validateBooksResponse);
    });
  });
  