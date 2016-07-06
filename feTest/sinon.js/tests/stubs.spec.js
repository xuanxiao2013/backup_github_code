

var sinon = require('sinon')
var assert = require('chai').assert
var sum = require('../src/sum.js');

describe('stub test', function(){
    it("callArg", function () {
        var callback = sinon.stub(), a;
        callback(function () {
            a = 0;
        }, function () {
            a = 1;
        });
        callback.callArg(1);
        assert(a === 1)

        callback.callArg(0);
        assert(a === 0)
    })
})