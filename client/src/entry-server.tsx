import { StrictMode } from 'react'
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from 'react-dom/server'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>,
    options,
  )
}