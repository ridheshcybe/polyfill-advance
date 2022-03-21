//@ts-nocheck

class TimeoutError extends Error {
    constructor() {
        super();
        this.message = 'TimeoutError';
        this.name = 'TimeoutError';
    }
}

Promise.timeOut = (ms: number, promise: Promise<any> = Promise.resolve(null)) => {
    var error = new TimeoutError(),
        timeout;

    return Promise.race([
        promise,
        new Promise((_, j) => {
            timeout = setTimeout(() => j(error), ms);
        }),
    ]).then((v) => {
        clearTimeout(timeout);
    }, (err) => {
        clearTimeout(timeout);
        throw err;
    });
};

Promise.allSettled = (promises = [new Promise((r, j) => r())]) => Promise.all(promises.map(p => p
    .then(value => ({ status: 'fulfilled', value }))
    .catch(reason => ({ status: 'rejected', reason }))
))

Promise.immediate = (fn = () => { }, aftereloop = false) => {
    if (!aftereloop) return process.nextTick(fn);
    setTimeout(() => fn(), 0);
};

Promise.resolve = (val) => new Promise((r, _) => {
    r(val);
});

Promise.reject = (reason) => new Promise((_, r) => {
    r(reason);
})

Promise.race = (promises) => new Promise((r, j) => {
    promises.map((promise) => promise.then(r, j));
});

Promise.all = (promises) => {
    let fulfilledPromises = [],
        result = [];

    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => promise.then((val) => {
            fulfilledPromises.push(true);
            result[index] = val;

            if (fulfilledPromises.length === promises.length) return resolve(result);
        }).catch((error) => {
            return reject(error);
        }));
    });
}

globalThis.Promise = Promise;