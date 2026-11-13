import { setupWorker } from 'msw/browser';
import { handlers } from './';

export { HttpResponse, http } from 'msw';

export const worker = setupWorker(...handlers);
