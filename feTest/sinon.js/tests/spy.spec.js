

var sinon = require('sinon')
var assert = require('chai').assert
var sum = require('../src/sum.js');

describe('spy test', function(){
    it("called", function () {
        var spy = sinon.spy(sum);
        spy.call({}, 1, 2, 3);
        assert(spy.called);
        assert(spy.returnValues[0] === 6);
    });

    it("callCount", function () {
        var spy = sinon.spy(sum);
        spy.call({}, 1, 2, 3);
        spy.call({}, 1, 2, 3);
        assert(spy.callCount === 2)
    });

    it("returnValues", function () {
        var spy = sinon.spy(sum);
        spy.call({}, 1, 2, 3);
        assert(spy.returnValues[0] === 6);
    });

})