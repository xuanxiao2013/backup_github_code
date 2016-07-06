

var sinon = require('sinon')
var assert = require('chai').assert
var sum = require('../src/sum.js');

describe('mock test', function(){
    it("mock", function () {
        var myAPI = { method: function () {} };
        var mock = sinon.mock(myAPI);
        mock.expects("method").returns(42);
        assert(myAPI.method() === 42);
        mock.verify();
    })
})