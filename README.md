# go-lib

`go-lib` is a collection of tools for the game of GO.
For the moment it only has a React Component for drawing a board with stones :)

[![build status](https://img.shields.io/travis/beldur/go-lib/master.svg)](https://travis-ci.org/beldur/go-lib)
[![npm](https://img.shields.io/npm/v/go-lib.svg)](https://www.npmjs.com/package/go-lib)

### Installation

```shell
$ yarn add go-lib
```

### Usage

#### Rendering a GO board

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Board } from 'go-lib/components'

const stones = [
  { coordinate: { x: 16, y: 4 }, color: 'B' },
  { coordinate: { x: 4, y: 16 }, color: 'W' },
]

ReactDOM.render(<Board size={19} positions={stones} />, document.body)
```
