exports.delay = function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};
