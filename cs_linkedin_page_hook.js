(() => {
    let original = window.requestIdleCallback
    window.requestIdleCallback = (callback, options) => {
        return original(() => {});
    }
})();