describe("mocking ajax", function() {
	it("suite wide usage", function() {
		beforeEach(function() {
		});
		afterEach(function() {
		});

		var mockUrl = '/some/cool/url';
		Mock.mock(mockUrl, {
			'items|1': [{
				'id|+1': 1,
				'email': '@EMAIL',
				'url': '@url',
				'guid': '@guid'
			}]
    	});
		// ajax
		$.ajax(mockUrl).done(function(data){
			doneFn(JSON.parse(data).items)
		});
		function doneFn(items){
			expect(items.length === 2).toBe(true);
			console.log(item.id);
		}
	});
});
