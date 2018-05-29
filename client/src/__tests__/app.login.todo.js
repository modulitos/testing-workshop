import React from 'react'
import App from '../app'
import axiosMock from 'axios'
import {Simulate} from 'react-testing-library'
import {renderWithRouter, generate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'

// add a beforeEach for cleaning up state and intitializing the API
beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('login as an existing user', async () => {
  const {
    container,
    getByLabelText,
    getByTestId,
    getByText,
    finishLoading,
  } = renderWithRouter(<App />)

  await finishLoading()

  const leftClick = {button: 0}
  const loginButton = getByText('login')
  // NOTE: Simulate is overly complicated and it's probably best to
  // just load the form into the dom and then actually first a "click"
  // event on the loginButton:
  // This is here because React attaches a single event handler for
  // every event type on the document, so any event will bubble up to
  // that single event handler. It was used for perf resaons, but
  // browsers are much faster and it's really not needed.
  Simulate.click(loginButton, leftClick)
  expect(window.location.href).toContain('login')

  const fakeUser = generate.loginForm()
  const formWrapper = container.querySelector('form')
  const {post} = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(
    () =>
      Promise.resolve({
        data: {user: {...fakeUser, token}},
      }),
    // NOTE: can simulate an error message from api via:
    // Promise.reject({ ..})
  )
  getByLabelText('Username').value = fakeUser.username
  getByLabelText('Password').value = fakeUser.password
  // NOTE: Simulate is overly complicated and it's probably best to
  // just load the form into the dom and then actually first a "click"
  // event on the loginButton:
  Simulate.submit(formWrapper)

  await finishLoading()

  expect(post).toHaveBeenCalledTimes(1)
  expect(post).toHaveBeenCalledWith('/auth/login', fakeUser)

  expect(window.localStorage.getItem('token')).toBe(token)
  expect(window.location.href).not.toContain('login')
  expect(getByTestId('username-display').textContent).toEqual(fakeUser.username)
  expect(getByText('Logout')).toBeTruthy()

  // render the app with the router provider and custom history
  //
  // wait for the app to finish loading the mocked requests
  //
  // navigate to login by clicking login-link
  //
  // fill out the form
  //
  // submit form
  // first use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // Now simulate a submit event on the form
  //
  // wait for the mocked requests to finish
  //
  // assert post was called correctly
  // assert localStorage is correct
  // assert the user was redirected (window.location.href)
  // assert the username display is the fake user's username
  // assert the logout button exists
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=app.login&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
