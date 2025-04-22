import { StaticRouter } from 'react-router-dom/server'; // ✅ Missing import fixed
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from 'react-dom/server';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
      <StaticRouter location={_url}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StaticRouter>,
    options,
  );
}
