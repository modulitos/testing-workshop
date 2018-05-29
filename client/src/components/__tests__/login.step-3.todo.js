// dealing with react's simulated events
import React from 'react'
import {generate} from 'til-client-test-utils'
import {
  cleanup,
  renderIntoDocument,
  render,
  Simulate,
  fireEvent,
} from 'react-testing-library'
import Login from '../login'

// Due to the fact that our element is not in the document, the
// click event on the submit button will not be treated as a
// submit event on the form which is why we're simulating a submit
// event on the form rather than clicking the button and then
// asserting the button's type is set to submit rather than just
// clicking on the button.
//
// Alternatively, we could actually insert the element directly into
// the document, then click on the button and that should work!
// Try doing that!
// (Tip: document.body.appendChild(container) and getByText('submit').click())
//
// Bonus: Don't forget to cleanup after yourselve when you're finished so you don't
// have things hanging out in the document!
//
// Extra bonus, rather than manually inserting the container into the document
// check out the docs for react-testing-library and the renderIntoDocument method!

afterEach(cleanup)

test('calls onSubmit with the username and password when submitted 3', () => {
  // Arrange
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  // const {container, getByLabelText, getByText} = render(
  const {container, getByLabelText, getByText, unmount} = renderIntoDocument(
    <Login onSubmit={handleSubmit} />,
  )

  const usernameNode = getByLabelText('username')
  const passwordNode = getByLabelText('password')
  // const formNode = container.querySelector('form')
  const submitButtonNode = getByText('submit')

  // Act
  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // do this:
  // document.body.appendChild(container)
  // getByText('submit').click()
  // or this:
  fireEvent.click(getByText('submit'))
  // which is analogous to `submitNode.dispatchEvent(new Event('click'))`
  // or `Simulate.click(submitNode)`

  // instead of this:
  // Simulate.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  // don't need this, b/c the button was clicked and triggered a
  // submit:
  // expect(submitButtonNode.type).toBe('submit')

  // // this unmounts the component, but doesn't actually unmount the
  // // container:
  // unmount()
  // // to make sure we cleaned everythign up:
  // document.body.innerHTML = ''
  // // or use the `afterEach(cleanup)` util.
})

test.skip('cleanup', () => {
  // check to see that our form was cleaned up:
  console.log('docuement.body.innerHTML:', document.body.innerHTML)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-3%20(renderIntoDocument)&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
