describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Mike Vautour',
      username: 'mike',
      password: 'mikepass'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mike')
    cy.get('#password').type('mikepass')
    cy.get('#login-button').click()
    cy.contains('Mike Vautour logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mike')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong credentials')
    //cy.get('.error').contains('wrong credentials')
    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.contains('Mike Vautour logged in').should('not.exist')
    // Alt
    //cy.get('html').should('not.contain', 'Mike Vautour logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mike', password: 'mikepass' })
    })

    it('a new note can be created', function() {
      cy.get('#new-note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.get('#save-note-button').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        /* cy.contains('second note').parent().find('button').click()

        cy.contains('second note').parent().find('button')
          .should('contain', 'make not important') */

        // Using Alias
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })

  })

})