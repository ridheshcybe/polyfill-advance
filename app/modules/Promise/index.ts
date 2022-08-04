//@ts-nocheck

class TimeoutError extends Error {
  constructor() {
    super();
    this.message = "TimeoutError";
    this.name = "TimeoutError";
  }
}

if (!Promise.resolve)
  Promise.resolve = (val) =>
    new Promise((r, _) => {
      r(val);
    });

if (!Promise.reject)
  Promise.reject = (reason) =>
    new Promise((_, r) => {
      r(reason);
    });

if (!Promise.timeOut)
  Promise.timeOut = (ms: number, p?: Promise<any>) => {
    if (!p) p = Promise.resolve(null);
    const error = new TimeoutError();
    let timeout;

    return Promise.race([
      p,
      new Promise((_, j) => {
        timeout = setTimeout(() => j(error), ms);
      }),
    ]).then(
      (v) => {
        clearTimeout(timeout);
      },
      (err) => {
        clearTimeout(timeout);
        throw err;
      }
    );
  };

if (!Promise.allSettled)
  Promise.allSettled = (promises = [new Promise((r, j) => r())]) =>
    Promise.all(
      promises.map((p) =>
        p
          .then((value) => ({ status: "fulfilled", value }))
          .catch((reason) => ({ status: "rejected", reason }))
      )
    );

if (!Promise.immediate)
  Promise.immediate = (fn = () => {}, aftereloop = false) => {
    if (!aftereloop) return process.nextTick(fn);
    setTimeout(() => fn(), 0);
  };

if (!Promise.race)
  Promise.race = (promises) =>
    new Promise((r, j) => {
      promises.map((promise) => promise.then(r, j));
    });

if (!Promise.all)
  Promise.all = (promises) => {
    let fulfilledPromises = [],
      result = [];

    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) =>
        promise
          .then((val) => {
            fulfilledPromises.push(true);
            result[index] = val;

            if (fulfilledPromises.length === promises.length)
              return resolve(result);
          })
          .catch((error) => {
            return reject(error);
          })
      );
    });
  };

export default Promise;
