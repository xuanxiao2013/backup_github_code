/**
 * @auth 玄啸
 * @date 16/1/25
 */

describe("A suite1", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});
describe("A suite2", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});
describe("A suite3", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});
describe("A suite4", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});

describe('Top Level suite', function() {
	it('spec', function() {
		expect(1).toBe(1);
	});

	describe('Nested suite', function() {
		it('nested spec', function() {
			expect(true).toBe(true);
		});
	});
});
