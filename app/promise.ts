class promise {
    value = null;
    called = false;
    onJ = null;
    onR = null;
    j = false;
    f = false;
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
    }

    then(cb) {
        this.onR = cb;

        if (this.f && !this.called) {
            this.called = true;
            this.onR(this.value);
        }
        return this;
    }

    catch(cb) {
        this.onJ = cb;

        if (this.j && !this.called) {
            this.called = true;
            this.onJ(this.value);
        }
        return this;
    }

    timeOut(ms = 1000) {
        return new Promise((r, j) => setTimeout(r, ms))
    }

    immediate(fn, aftereloop = false) {
        if (!aftereloop) return process.nextTick(fn);
        setTimeout(() => fn(), 0);
    }

    resolve(val) {
        return new Promise((r, _) => {
            r(val);
        });
    }

    reject(reason) {
        return new Promise((_, r) => {
            r(reason);
        })
    }

    all(promises) {
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
}

export default promise;