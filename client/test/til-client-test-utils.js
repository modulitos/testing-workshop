import React from 'react'
import {Router} from 'react-router-dom'
import {render, wait} from 'react-testing-library'
import {createMemoryHistory} from 'history'
import 'jest-dom/extend-expect'
import * as generate from 'til-shared/generate'

function renderWithRouter(ui, {route = '/', ...renderOptions} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions)
  // when the app is starting and fetching data, a "loading" message is displayed.
  // this function is a simple abstraction to allow the consumer to write tests
  // that know when the "loading" message is gone.
  const finishLoading = () =>
    // 'wait' is a promise that resolves when its function arg doesn't return
    // an error.
    wait(() => expect(utils.queryByText('Loading')).toBeNull())
  return {
    ...utils,
    finishLoading,
    history,
  }
}

export {
  Simulate,
  wait,
  render,
  cleanup,
  renderIntoDocument,
  fireEvent,
} from 'react-testing-library'
export {renderWithRouter, generate}
