

// 不存在遍历提升
// 不允许重复声明

let a1 = 20;

{
    var b = 0;
    let c = 0;
}


var aa = 1;

log(window.a1)
log(window.aa)

let { length: len } = 'abcedrfg';

log(len);

log('hello'.repeat(10))


function test(...arg){
    "use strict";
    log(arg)
}

test(2, 0, 'sss', 4567);

let logg = console.log.bind(console);

logg('aaa')