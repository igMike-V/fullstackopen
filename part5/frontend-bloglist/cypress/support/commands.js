// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users', { name, username, password})
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { content, author },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedInBlogAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addBlog', () => {
  cy.get('.blog-form-show').click()
  cy.get('#blog-title').type('Building up an immunity to iocane powder')
  cy.get('#blog-author').type('Wesley')
  cy.get('#blog-url').type('https://getyarn.io/yarn-clip/b49853f4-c0c6-4474-90b4-dd238a66609b')
  cy.get('#new-blog-button').click()
})