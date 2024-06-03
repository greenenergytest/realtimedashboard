/// <reference types="vite/client" />
declare module 'vite-plugin-node-polyfills' {
  import { Plugin } from 'vite';
  function NodePolyfills(options?: { protocolImports?: boolean }): Plugin;
  export default NodePolyfills;
}
