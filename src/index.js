import * as React from 'react'
import {render} from 'react-dom'

import App from './App/index.js'
import './styles.css'


const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

render(<App />, rootElement)
