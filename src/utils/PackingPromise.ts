type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void
type PromiseReject = (reason?: any) => void;
type Pack<T> = (part: T) => void;

type NewExecutor<T> = (resolve: PromiseResolve<T>, reject: PromiseReject,
                       pack: Pack<T>) => void;

class PackingPromise<T> extends Promise<T> {
    workers: Array<Pack<T>> = [];

    constructor(executor: NewExecutor<T>) {
        super((resolve, reject) => {
            executor(resolve, reject, (part: T) => {
                this.workers.forEach(worker => worker(part))
            });
        });
    }

    packing (onPacking: Pack<T>) {
        this.workers.push(onPacking)
    }
}

export default PackingPromise;
export {
    PackingPromise
}
