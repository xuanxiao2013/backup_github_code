"use strict";
/*global $, console*/
var suite;
if (typeof require !== 'undefined' && typeof module !== 'undefined') {
    var testCase = require('/usr/local/lib/node_modules/nodeunit').testCase;
    require('../../src/global');
    require('../../src/table/core');
}

suite = {
    "日期格式转换-字符串转数组": function(test) {
		test.ok(true);
        test.done();
    }
};

function setUp(callback) {
    callback();
}

function tearDown(callback) {
    callback();
}
if (typeof require !== 'undefined' && typeof module !== 'undefined') {
    suite.setUp = setUp;
    suite.tearDown = tearDown;
    module.exports = testCase(suite);
} else {
    this.suite = suite;
}
