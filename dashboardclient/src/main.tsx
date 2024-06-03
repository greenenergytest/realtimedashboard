import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.ts';
import { Buffer } from 'buffer';
import process from 'process';
import globalThis from 'globalthis';
import 'globalthis/auto';

window.Buffer = Buffer;
window.process = process;

// Create a module augmentation for NodeJS.Global
declare global {
  namespace NodeJS {
    interface Global {
      Buffer: typeof Buffer;
      process: typeof process;
    }
  }
}

// Assign Buffer and process to globalThis in a type-safe manner
(globalThis as any).Buffer = Buffer;
(globalThis as any).process = process;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
