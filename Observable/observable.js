/**
 * An Observable is basically a function that can return a stream of values to an observer over time, 
 * this can either be synchronously or asynchronously. 
 * The data values returned can go from zero to an infinite range of values.
 */
class MyObservable {
    constructor(subscriber) {
        this.__subscriber = subscriber;
    }
    /**
     * 
     * @param {*} observer 
     */
    subscriber(observer) {
        return this.__subscriber(observer);
    }

    /**
     * Takes an item at a time and transform it to another item
     * @param {*} projection function which transform an item.
     * @return Return and observable
     */
    map(projection) {
        return new MyObservable((observer) => {
            const subscription = this.subscriber({
                next(v) {
                    observer.next(projection(v));
                },
                error(err) {
                    observer.error(err);
                },
                complete() {
                    observer.complete();
                }
            });
            return subscription;
            // or we can return new object of Subscription.
            // Unsubscribing source subscriber.
            // return {
            //     unsubscribe(){
            //         subscription.unsubscribe();
            //     }
            // }
        });
    }
}


module.exports = {
    MyObservable: MyObservable
}