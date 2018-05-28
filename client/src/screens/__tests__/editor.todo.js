import React from 'react'
import ReactDOM from 'react-dom'
import * as utilsMock from '../../utils/api' // this gets mocked out by our mock defined below
import Editor from '../editor.todo'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  const container = document.createElement('div')
  const fakeUser = {id: 'foobar'}
  const fakeHistory = {
    push: jest.fn(),
  }
  ReactDOM.render(<Editor history={fakeHistory} user={fakeUser} />, container)
  const form = container.querySelector('form')
  // console.log(form.elements.title)  // form.elements.title is an HTML collection

  const {title, content, tags} = form.elements
  title.value = 'i like twix' // just an HTML element
  content.value = 'kinda sorta'
  // to test this logic: `tags.value.split(',').map(t => t.trim()),`:
  tags.value = 'twix,  my,likes'

  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  // allows us to await promises in handleSubmit, api.posts.create():
  await flushPromises()

  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(utilsMock.posts.create).toHaveBeenCalledTimes(1)
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'my', 'likes'],
    date: expect.any(String),
  })

  // Arrange
  // create a fake user, post, history, and api
  //
  // use ReactDOM.render() to render the editor to a div
  //
  // fill out form elements with your fake post
  //
  // Act
  // submit form
  //
  // wait for promise to settle
  //
  // Assert
  // ensure the create function was called with the right data
})

// TODO later...
test('snapshot', () => {})
