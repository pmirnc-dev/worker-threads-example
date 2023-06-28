const { parentPort, workerData, isMainThread, threadId } = require('worker_threads');
// import { parentPort, workerData, isMainThread, threadId } from 'worker_threads';
function printTime() {
  return new Date().getTime();
}

function computing(index) {
  console.log(printTime() + ' > got message : ' + index);
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  console.log(printTime() + ' > check message : ' + index, 'sum ->', sum);
  return index;
}

parentPort?.on('message', async (index) => {
  const value = computing(index);
  parentPort?.postMessage(value);
  parentPort?.close();
});

module.exports = computing;
