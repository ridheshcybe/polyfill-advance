class promise {
    finallycallback: any = () => { };
    finallycb = () => { };
    value = null;
    called = false;
    onJ = null;
    onR = null;
    j = false;
    f = false;

    static timeOut: (ms?: number) => Promise<unknown>;
    static allSettled: (promises: any) => any;
    static immediate: (fn: any, aftereloop?: boolean) => void;
    static resolve: (val: any) => Promise<unknown>;
    static reject: (reason: any) => Promise<unknown>;
    static all: (promises: any) => Promise<unknown>;
    static race: (promises: any) => promise;
    constructor(exec) {
        const self = this;

        function d(e, f) {
            let l = "r" == e ? self.onR : self.onJ;
            "r" == e ? (self.f = !0) : (self.j = !0);
            self.value = f;
            "function" == typeof l && (l(f), self.called = !0)
        }

        try {
            exec(e => d("r", e), e => d("j", e))
        } catch (e) {
            d("r", e)
        }

        Object.defineProperty(this, "finallycb", {
            get() {
                return self.finallycallback;
            },
            set(val) {
                self.finallycallback = val;
            }
        })
    }

    then(cb) {
        this.onR = cb;

        if (this.f && !this.called) {
            this.called = true;
            this.finallycb();
            this.onR(this.value);
        }
        return this;
    }

    catch(cb) {
        this.onJ = cb;

        if (this.j && !this.called) {
            this.called = true;
            this.finallycb();
            this.onJ(this.value);
        }

        return this;
    }

    finally(cb) {
        this.finallycb = cb;
        return this;
    }
}

promise.timeOut = function (ms = 1000) {
    return new Promise((r, j) => setTimeout(r, ms))
};

promise.allSettled = (promises) => promise.all(promises.map(p => p
    .then(value => ({ status: 'fulfilled', value }))
    .catch(reason => ({ status: 'rejected', reason }))
))

promise.immediate = (fn, aftereloop = false) => {
    if (!aftereloop) return process.nextTick(fn);
    setTimeout(() => fn(), 0);
}

promise.resolve = (val) => new Promise((r, _) => {
    r(val);
});

promise.reject = (reason) => new Promise((_, r) => {
    r(reason);
})

promise.race = (promises) => new promise((r, j) => {
    promises.map((promise) => promise.then(r, j));
});

promise.all = (promises) => {
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

export default promise;