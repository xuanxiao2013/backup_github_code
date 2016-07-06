/**
 * @auth 玄啸
 * @date 16/1/28
 */

var assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            //[1,2,3].indexOf(5).should.equal(-1);
            //[1,2,3].indexOf(0).should.equal(-1);
            assert.equal([1,2,3].indexOf(5), -1)
        });
    });
});

function User(name){
    this.name = name;
}
User.prototype.save = function(callback){
    var me = this;
    setTimeout(function(){
        callback(me.name)
    }, 1000)
}

describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var name = 'Luna', user = new User(name);
            user.save(function(n){
                assert.equal(n, name);
                done();
            });
        });
    });
});


describe('hooks', function() {

    var a = 0, b = 0;
    before(function() {
        // runs before all tests in this block
        //console.log('before')
        a = 1;
    });

    after(function() {
        // runs after all tests in this block
        //console.log('after')
        a = 2;
    });

    beforeEach(function() {
        // runs before each test in this block
        //console.log('beforeEach')
        a = 3;
        b = 1;
    });

    afterEach(function() {
        // runs after each test in this block
        //console.log('afterEach')
        b = 2;
    });

    it('11111', function(done) {
        assert.equal(1, 1);
        //console.log(a, b)
        done();
    });
    it('22222', function(done) {
        assert.equal(1, 1);
        //console.log(a, b)
        done();
    });
});


describe('a suite of tests', function() {
    this.timeout(500);

    it('should take less than 500ms', function(done){
        setTimeout(done, 300);
    });

    it('should take less than 500ms as well', function(done){
        setTimeout(done, 200);
    });
})