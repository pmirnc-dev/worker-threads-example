import { WorkerThreadApp } from './worker.thread.app';

(async() => {

  const worker = new WorkerThreadApp();

  worker.multiThread();


})();
