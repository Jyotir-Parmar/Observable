const { MyObservable } = require('./observable')

const timer = (time) => {
    return new MyObservable(function subscriber(observer) {
        const handle = setTimeout(() => {
            observer.next();
            observer.complete();
        }, time);
        return {
            unsubscribe() {
                clearTimeout(handle);
            }
        }
    });
}

module.exports.timer = timer;


// Test Cases.
const observable = timer(3000);
console.log(`Before Subscribe`);
observable.subscriber({
    next(value) {
        console.log(`Inside next`);
    },
    complete(value) {
        console.log(`Inside complete`);
    },
    error(error) {
        console.log(`Inside error`);
    }

});