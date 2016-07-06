
// 这个还有点问题，待研究
var chai = require("chai"), assert = chai.assert, expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe('mocha chai-as-promised', function () {
    it('chai-as-promised', function () {
        //assert.equal('a', 'bar', 'foo equal `bar`');
        //console.log(assert)
        //assert.isRejected(promise, "optional message");
        //(2 + 2).should.equal(4);
       // expect({ foo: "bar" }).to.have.property("foo");
        //promise.resolve(2 + 2).should.eventually.equal(4)
    });
});


describe('api', function() {
    describe('GET /api/users', function() {
        it('respond with an array of users', function() {
            //(2 + 2).should.equal(4);
        });
    });
    describe('GET /api/users', function() {
        it('respond with an array of users', function() {
            //(2 + 2).should.equal(4);
        });
    });
});