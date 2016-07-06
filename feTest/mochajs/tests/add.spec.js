
var add = require('../src/add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        expect(add(1, 1)).to.be.equal(2);
    });
});

it('测试应该5000毫秒后结束', function(done) {
    var x = true;
    var f = function() {
        x = false;
        expect(x).to.be.not.ok;
        done(); // 通知Mocha测试结束
    };
    setTimeout(f, 4000);
});

//it.only('异步请求应该返回一个对象', function() {
//    return fetch('https://api.github.com')
//        .then(function(res) {
//            return res.json();
//        }).then(function(json) {
//            expect(json).to.be.an('object');
//        });
//});

