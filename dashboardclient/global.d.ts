import { Buffer } from 'buffer';
import process from 'process';

declare global {
  namespace NodeJS {
    interface Global {
      Buffer: typeof Buffer;
      process: typeof process;
    }
  }

  var Buffer: typeof Buffer;
  var process: typeof process;
}
