describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const MAINUSER = {
      name: 'Mike Vautour',
      username: 'mike',
      password: 'password'
    }
    const SECONDUSER = {
      name: 'Other User',
      username: 'user',
      password: 'password'
    }
    cy.createUser(MAINUSER)
    cy.createUser(SECONDUSER)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mike')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Mike Vautour is logged in.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mike')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      // Check if error displays
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(144, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mike')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('.blog-form-show').click()
      cy.get('#blog-title').type('Building up an immunity to iocane powder')
      cy.get('#blog-author').type('Wesley')
      cy.get('#blog-url').type('https://getyarn.io/yarn-clip/b49853f4-c0c6-4474-90b4-dd238a66609b')
      cy.get('#new-blog-button').click()

      cy.get('.notice')
        .should('contain', 'a new blog: Building up an immunity to iocane powder by Wesley added')
        .and('have.css', 'background-color', 'rgb(178, 247, 108)')

    })

    it('user can like own blog', function() {
      cy.addBlog()
      cy.get('.blog').find('.show-button').click()
      cy.get('.blog-details').find('.like-button').click()
      cy.get('.blog-details').should('contain', 'likes: 1')
      
      cy.get('#logout-button').click()

      cy.login({ username:'user', password:'password' })
      cy.get('.blog').find('.show-button').click()
      cy.get('.blog-details').find('.like-button').click()
      cy.get('.blog-details').should('contain', 'likes: 2')
    })

    it.only('user who created blog can delete it', function() {
      cy.addBlog()
      cy.get('.blog').find('.show-button').click()
      cy.get('.blog-details').find('.remove-button').click()
      cy.get('.notice')
        .should('contain', 'Removed Blog: Building up an immunity to iocane powder')
        .and('have.css', 'background-color', 'rgb(178, 247, 108)')
      
    })
  })


})