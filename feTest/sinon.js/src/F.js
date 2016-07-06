/**
 * @auth 玄啸
 * @date 16/1/20
 */

function once(fn) {
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}

module.exports = once;