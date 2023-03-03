describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Mike Vautour',
      username: 'mike',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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

    it.only('fails with wrong credentials', function() {
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

})