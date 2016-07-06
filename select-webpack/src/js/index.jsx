import { log, util } from './util.jsx';
import List from './List.jsx';
import Header from './Header.jsx';
import { singleData, multipleChoiceData, singleTabData, multipleTabData} from './data.jsx';


class Select{
    constructor(...args){
        this.opts = args[0];

        // headerHtml
        this.config = util.clone(this.opts);

        this.config.placeholder = this.config.placeholder || '';
        this.config.hasSearch = Boolean(this.config.hasSearch) || 0;
        this.config.maxCounts = Number(this.config.maxCounts) || 5;
        this.config.itemHeight = Number(this.config.itemHeight) || 35;
        this.config.listMaxHeight = Number(this.config.listMaxHeight) || Number(this.config.itemHeight) * this.config.maxCounts;

        this.config.containerWidth = this.opts.domContainer.width();
        this.config.containerHeight = this.opts.domContainer.height();
        // 模式 单选 或者 多选
        // mode [ single | multiple]

        // 显示形式
        // showMode [ bottomLeft | bottomRight | topLeft | topRight ]

        // tab 不支持搜索
        if(this.config.data.tab){
            this.config.hasSearch = 0;
        }

        // 参数修正
        this.opts.minWidth = this.opts.minWidth || 50;

        this.fixData();

        this.renderLayout();
        this.init();
    }

    renderLayout(){
        var me = this,
            multipleClass = me.isModeMultiple() ? 'select-header-multiple' : 'select-header-single',
            disable = me.config.disable ? 'select-container-disable' : '',
            html =
            `
            <div class="select-container ${disable}">
                <div class="select-header ${multipleClass}"></div>
                <div class="select-list"></div>
                <div class="select-progress"><div class="bar"></div></div>
            </div>
            `;
        this.opts.domContainer.html(html);

        me.config.$selectContainer = $('.select-container', me.opts.domContainer);
        me.config.$selectHeader = $('.select-header', me.config.$selectContainer);
        me.config.$selectTab = $('.select-tab', me.config.$selectContainer);
        me.config.$selectList = $('.select-list', me.config.$selectContainer);
        me.config.$selectprogress = $('.select-progress', me.config.$selectContainer);

        me.selectHeader = new Header(me);
        me.selectList = new List(me);

    }

    isModeMultiple(){
        return this.config.mode && this.config.mode === 'multiple';
    }

    fixData(){
        var data = this.opts.data || {};
        var list = data.list || [], checked = data.checked || null, tab = this.config.data.tab || [];

        if(this.isModeMultiple() && !checked){
            checked = [];
        }

        if(tab.length > 0 && tab.length !== this.config.data.list.length){
            throw Error('tab len error');
        }

        this.config.data = {
            tab,
            checked,
            list
        }
    }

    process (start, end){
        var me = this, $process = me.config.$selectprogress, $bar = $process.find('.bar');
        $process.show();
        $bar.css({'width': start + '%'}).show();
        $bar.animate({'width': end+ '%'}, 200, function(){
            if(parseInt(end, 10) === 100){
                $bar.css({'width': '0%'});
                $process.hide();
            }
        });
    };
}

var sp = Select.prototype;
sp.init = function(){
    this.show();
};
sp.show = function() {
    this.config.$selectContainer.show();
};
sp.hide = function() {
    this.config.$selectContainer.hide();
};

sp.processStart = function(){
    this.process(0, 80);
};
sp.processEnd = function(){
    this.process(80, 100);
};



var select1 = new Select({
    domContainer: $('#select1'),
    placeholder: '请选择...',
    clickGetAjaxData: function(callback){
        setTimeout(function(){
            callback.call(select1, singleData)
        }, 1000)
    },
    hasSearch: 1,
    maxWidth: 400,
    searchServer: function(searchKey, callback){
        setTimeout(function(){
            callback.call(select1, {
                checked: singleData.checked,
                list: singleData.list.slice(90)
            })
        }, 10)
    },
    //disable: 1,
    //data: singleData
    data: {}
});
var select3 = new Select({
    domContainer: $('#select3'),
    placeholder: '请选择...',
    //clickGetAjaxData: function(callback){
    //    setTimeout(function(){
    //        callback.call(select1, singleData)
    //    }, 1000)
    //},
    showMode: 'bottomLeft',
    hasSearch: 1,
    maxWidth: 400,
    //searchServer: function(searchKey, callback){
    //    setTimeout(function(){
    //        callback.call(select1, {
    //            checked: singleData.checked,
    //            list: singleData.list.slice(90)
    //        })
    //    }, 1000)
    //},
    //disable: 1,
    data: singleTabData
});
var select2 = new Select({
    domContainer: $('#select2'),
    placeholder: '请选择...',
    mode: 'multiple',
    clickGetAjaxData: function(callback){
        setTimeout(function(){
            callback.call(select2, multipleChoiceData)
        }, 1000)
    },
    searchServer: function(searchKey, callback){
        setTimeout(function(){
            callback.call(select2, {
                checked: multipleChoiceData.checked,
                list: multipleChoiceData.list.slice(90)
            })
        }, 1000)
    },
    hasSearch: 1,
    maxWidth: 400,
    data: multipleChoiceData
});
var select4 = new Select({
    domContainer: $('#select4'),
    placeholder: '请选择...',
    mode: 'multiple',
    hasSearch: 1,
    maxWidth: 400,
    data: multipleTabData
});

var select5 = new Select({
    domContainer: $('#select5'),
    placeholder: '请选择...',
    clickGetAjaxData: function(callback){
        setTimeout(function(){
            callback.call(select1, singleData)
        }, 1000)
    },
    hasSearch: 1,
    searchServer: function(searchKey, callback){
        setTimeout(function(){
            callback.call(select1, {
                checked: singleData.checked,
                list: singleData.list.slice(90)
            })
        }, 100)
    },
    maxWidth: 600,
    //disable: 1,
    //data: singleData
    data: {}
});

var select6 = new Select({
    domContainer: $('#select6'),
    placeholder: '请选择...',
    clickGetAjaxData: function(callback){
        setTimeout(function(){
            callback.call(select1, singleData)
        }, 1000)
    },
    hasSearch: 1,
    searchServer: function(searchKey, callback){
        setTimeout(function(){
            callback.call(select1, {
                checked: singleData.checked,
                list: singleData.list.slice(90)
            })
        }, 10)
    },
    maxWidth: 300,
    data: {}
});