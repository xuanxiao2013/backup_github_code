/**
 * @auth 玄啸
 * @date 16/1/25
 */

var Mock = require('../spec/libs/mockjs.js'), $ = require('jquery');
//require('jasmine-ajax')

describe("mocking ajax", function() {

	it("suite wide usage", function() {
		beforeEach(function() {
			//jasmine.Ajax.install();
		});
		afterEach(function() {
			//jasmine.Ajax.uninstall();
		});

		var mockUrl = '/some/cool/url';
		Mock.mock(mockUrl, {
			'items|2-3': [{
				'id|+1': 1,
				'email': '@EMAIL',
				'url': '@url',
				'guid': '@guid'
			}]
    	});

		// ajax
		$.ajax(mockUrl).success(doneFn);

		function doneFn(data){
			console.log(data)
		}

		//expect(jasmine.Ajax.requests.mostRecent().url).toBe(mockUrl);
		//expect(doneFn).not.toHaveBeenCalled();

	});


});
