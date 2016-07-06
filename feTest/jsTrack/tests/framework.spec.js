

//describe("A suite of basic functions", function() {
//	it("reverse word",function(){
//		expect(true).toBe(true);
//	});
//});

var assert = require('assert');
describe('Array', function() {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});

describe('a suite of tests', function() {
	this.timeout(5000);

	it('should take less than 500ms', function(done){
		setTimeout(done, 3000);
	});

	it('should take less than 500ms as well', function(done){
		setTimeout(done, 2000);
	});
})
