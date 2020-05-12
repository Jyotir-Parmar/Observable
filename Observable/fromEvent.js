const { MyObservable } = require('./observable');

const fromEvent = (dom, eventName) => {
    return new MyObservable((observer) => {
        const handler = (ev) => {
            observer.next(ev);
        }
        dom.addEventListener(eventName, handler);

        return {
            unsubscribe() {
                dom.removeEventListener(eventName, handler);
            }
        }
    })
};

module.exports.fromEvent = fromEvent;