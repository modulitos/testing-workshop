import React from 'react'

function ItemList({items}) {
  return items.length ? (
    <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
  ) : (
    // 'no items'
    // making this change shouldn't break tests, otherwise minor "refactors" would always be breaking the tests
    // <span>'no items'</span>
    <span>
      <div> no </div>items
    </span>
  )
}

export default ItemList
