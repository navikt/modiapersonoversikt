import { IWebWorkerCom, NoWorkerCommunicator, WebWorkerCommunicator } from './WebWorkerCommunicator';

export const persistentLoginWebworkerFactory = (): IWebWorkerCom => {
    if (!Worker) {
        console.warn('WebWorker er ikke støttet av nettleseren. Kjører innlogging logikk i hovedtråden.');
        return new NoWorkerCommunicator();
    }
    let worker: Worker;
    try {
        worker = new Worker(new URL('../loginWebWorker', import.meta.url));
        return new WebWorkerCommunicator(worker);
    } catch (e) {
        console.log(e);
        return new NoWorkerCommunicator();
    }
};
