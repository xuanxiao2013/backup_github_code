
describe('mocha Assertions', function () {
    it('assert', function () {
        var assert = require('chai').assert
            , foo = 'bar'
            , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
        assert.typeOf(foo, 'string'); // without optional message
        assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
        assert.equal(foo, 'bar', 'foo equal `bar`');
        assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
        assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
    });

    it('expect', function () {
        var expect = require('chai').expect
            , foo = 'bar'
            , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
        expect(foo).to.be.a('string');
        expect(foo).to.equal('bar');
        expect(foo).to.have.length(3);
        expect(beverages).to.have.property('tea').with.length(3);
    });

    it('should', function () {
        var should = require('chai').should() //actually call the function
            , foo = 'bar'
            , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
        foo.should.be.a('string');
        foo.should.equal('bar');
        foo.should.have.length(3);
        beverages.should.have.property('tea').with.length(3);
    });
});




