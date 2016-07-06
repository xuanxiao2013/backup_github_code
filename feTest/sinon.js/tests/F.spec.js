/**
 * @auth 玄啸
 * @date 16/1/20
 */

var once = require('../src/F.js');
var sinon = require('sinon');
var assert = require('chai').assert;
describe('test spy spy', function() {
    it("calls the original function", function () {
        var callback = sinon.spy();
        var proxy = once(callback);
        proxy();
        proxy();
        assert(callback.callCount === 1);

        //var obj = {};
        //proxy.call(obj, 1, 2, 3);
        //assert(callback.calledOn(obj));
        ////assert(callback.calledWith(1, 2, 3));
        //
        //console.log(callback.callCount)
        //assert(callback.callCount);
    });

    it("calls the original function", function () {
        var spy = sinon.spy();
        var proxy = once(spy);

        proxy();

        assert(spy.called);
    });

    it("returns the return value from the original function", function () {
        var stub = sinon.stub().returns(42);
        var proxy = once(stub);
        assert(proxy() === 42, 'hello');
    });

    it("returns the return value from the original function", function () {
        var myAPI = { method: function () {} };
        var mock = sinon.mock(myAPI);
        mock.expects("method").once().returns(42);
        var proxy = once(myAPI.method);
        assert(proxy() === 42);
        mock.verify();
    });
});




