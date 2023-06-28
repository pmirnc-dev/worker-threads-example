import { select } from '@inquirer/prompts';
import { Worker, isMainThread } from 'worker_threads';
import path from 'path';


const workerJs = './worker.thread.js';

class WorkerThreadApp {
  private count = 10;
  multiThread() {
    // console.log('isMainThread', isMainThread);
    let computed = 0;
    console.time('multi threads');
    for (let i = 1; i <= this.count; i++) {
      const worker = new Worker(workerJs);

      worker.on('message', (data) => {
        computed += 1;
        if (computed === this.count) {
          console.timeEnd('multi threads');
        }
      });
      worker.postMessage(i);
    }
  }
  singleThread() {
    console.time('single threads');
    // MARK: single threads
    for (let i = 1; i <= this.count; i++) {
      const worker = require(workerJs);
      worker(i);
    }
    console.timeEnd('single threads');
  }
}

(async() => {

  const cls = new WorkerThreadApp();

  const answer = await select({ message: '싱글 or 멀티?', choices: [{ name: "single", value: "single", description: "싱글 스레드" }, { name: "multi", value: "multi", description: "멀티 스레드" }] });

  if (answer === 'single') {
    cls.singleThread();
  } else if (answer === 'multi') {
    cls.multiThread();
  }


})();
