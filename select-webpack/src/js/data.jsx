

var singleData = {
    checked: null,
    list: []
};

var multipleChoiceData = {
    checked: [],
    list: []
};

for(var i = 0; i < 100; i ++){
    singleData.list.push({
        clientKey: 'clientKey' + i,
        name: 'name-clientKey-' + i+ Math.random()
    });

    multipleChoiceData.list.push({
        clientKey: 'clientKey' + i,
        name: 'name-clientKey-' + i + Math.random()
    });
}

singleData.checked = singleData.list[2];
multipleChoiceData.checked = [
    multipleChoiceData.list[1],
    multipleChoiceData.list[2],
    multipleChoiceData.list[3]
];


var singleTabData = {
    tab: [
        {
            name: 'hello'
        },
        {
            name: `<span>hello2</span>`
        }
    ],
    checked: [],
    list: [
        [],
        []
    ]
};
singleTabData.checked = singleData.list[2];
singleTabData.list[0] = singleData.list.filter((item, i) => i % 2 === 0);
singleTabData.list[1] = singleData.list.filter((item, i) => i % 2 === 1);


var multipleTabData = {
    tab: [
        {
            name: 'hello'
        },
        {
            name: `<span>hello2</span>`
        }
    ],
    checked: [],
    list: [
        [],
        []
    ]
};
multipleTabData.checked = [singleData.list[2]];
multipleTabData.list[0] = singleData.list.filter((item, i) => i % 2 === 0);
multipleTabData.list[1] = singleData.list.filter((item, i) => i % 2 === 1);
//console.log(singleData)
//console.log(multipleChoiceData)
export {
    singleData,
    multipleChoiceData,
    singleTabData,
    multipleTabData
}

