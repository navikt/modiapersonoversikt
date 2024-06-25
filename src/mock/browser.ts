import { setupWorker } from 'msw/browser';
import { handlers } from './';

export const worker = setupWorker(...handlers);
