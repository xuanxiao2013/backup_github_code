

// 不存在遍历提升
// 不允许重复声明

'use strict';

var a1 = 20;

{
    var b = 0;
    var c = 0;
}

var aa = 1;

log(window.a1);
log(window.aa);

var _abcedrfg = 'abcedrfg';
var len = _abcedrfg.length;

log(len);

log('hello'.repeat(10));

function test() {
    'use strict';

    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
    }

    log(arg);
}

test(2, 0, 'sss', 4567);

var logg = console.log.bind(console);

logg('aaa');