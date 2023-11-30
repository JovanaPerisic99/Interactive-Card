import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { FormContextProvider } from './context/formContext'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: FormContextProvider, ...options})

export * from '@testing-library/react'
export {customRender as render}