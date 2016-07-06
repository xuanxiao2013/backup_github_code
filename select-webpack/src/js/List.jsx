import { log, util } from './util.jsx';

class List{
    constructor(select){
        this.select = select;
        this.config = {};
        this.config.itemActiveName = 'active';

        this.init();
    }
}
var lp = List.prototype;

lp.init = function(){
    var me = this, html = '';
    html += `<div class="list-container">`;
    if(me.select.config.hasSearch){
        html += `<div class="list-search"><input type="text" class="inputSearch" placeholder="${this.select.config.placeholder}"/></div>`;
    }
    if(me.select.config.data.tab.length > 0){
        html += `<div class="list-tab"></div>`;
    }
    html += `<div class="list-list"></div></div>`;

    me.select.config.$selectList.html(html);

    me.config.$listTab = $('.list-tab', me.select.config.$selectList);
    me.config.$listSearch = $('.list-search', me.select.config.$selectList);
    me.config.$listList = $('.list-list', me.select.config.$selectList);
    me.config.$inputSearch = $('.inputSearch', me.config.$listSearch);

    me.setShowMode();
};

lp.setShowMode = function(){
    var me = this;
    var maxWidth = me.select.config.maxWidth || 0, $selectList = me.select.config.$selectList;
    var containerWidth = me.select.config.containerWidth;
    var showMode = me.getShowMode();

    if(showMode === 'bottomLeft' || showMode === 'topLeft'){
        maxWidth > 0 && updateStyle(maxWidth, containerWidth - maxWidth);
    }else if(showMode === 'bottomRight' || showMode === 'topRight'){
        maxWidth > 0 && updateStyle(maxWidth);
    }

    function updateStyle(width, marginLeft){
        width && $selectList.css({'width': maxWidth});
        marginLeft && $selectList.css({'marginLeft': marginLeft});
    }

};

lp.getShowMode = function(){
    var me = this, showMode = me.select.config.showMode || '';
    var maxWidth = me.select.config.maxWidth || 0;
    var offset = me.select.opts.domContainer.offset(), documentHeight = $(document).height();
    var left = offset.left, top = offset.top, documentWidth = $(document).width();
    var containerWidth = me.select.config.containerWidth, containerHeight = me.select.config.containerHeight;
    var listHeight = me.select.config.$selectList.height();

    // 自动判断
    if(!showMode || showMode.length === 0){

        var topDiff = top,
            bottomDiff = documentHeight - (top + containerHeight),
            leftDiff = left,
            rightDiff = documentWidth - (left + containerWidth);

        if(maxWidth > 0){
            if(rightDiff > maxWidth){
                if(topDiff > listHeight ){
                    showMode = 'topRight';
                }else{
                    showMode = 'bottomRight';
                }
            }else{
                if(topDiff > listHeight ){
                    showMode = 'topLeft';
                }else{
                    showMode = 'bottomLeft';
                }
            }
        }else{
            if(bottomDiff > listHeight ){
                showMode = 'bottomRight';
            }else{
                showMode = 'topRight';
            }
        }

    }

    return showMode;
};

lp.show = function(){
    var me = this;
    me.config.$inputSearch.val('');
    me.select.config.$selectList.show();

    if(me.select.config.clickGetAjaxData){
        me.renderListListLoading();
        me.select.processStart();
        me.select.config.clickGetAjaxData(function(data){
            me.select.processEnd();
            if(data.list && data.list.length > 0){
                me.select.config.data = data;
                me.select.selectHeader.render();
                me.render();
            }else{
                me.renderListListNoData();
            }
        });
    }else{
        me.render();
    }


};

lp.hide = function(){
    this.select.config.$selectList.hide();
};

lp.isShow = function(){
    return this.select.config.$selectList.css('display') === 'none' ? 0 : 1;
};

lp.render = function(){
    var me = this;
    if(me.select.config.hasSearch){
        me.listSearchEvent();
    }
    if(me.select.config.data.tab){
        me.renderTab();
    }else{
        me.renderListList();
    }

};

lp.renderTab = function(){
    var me = this, html = [], len = me.select.config.data.tab.length, width = parseInt(100 / len, 10);
    me.select.config.data.tab.forEach( (item, i) => {
        html.push(`<div class="tab" style="width:${width}%;"><div class="tabHeaderContent">${item.name}</div></div>`);
    });
    me.config.$listTab.html(html.join(''));
    me.listTabEvent();
};

lp.renderListList = function(searchKey){
    var html = `${this.getItemHtml(searchKey)}`;
    this.config.$listList.html(html);
    this.listListEvent();
};
lp.renderListListLoading = function(){
    this.config.$listList.html('<div class="listItem loading">loading</div>');
    this.updateListScroll(1);
};
lp.renderListListNoData = function(){
    this.config.$listList.html('<div class="listItem noData">noData</div>');
    this.updateListScroll(1);
};

lp.renderListListNoData = function(){
    this.config.$listList.html('<div class="listItem noMatch">noMatch</div>');
    this.updateListScroll(1);
};

lp.updateListScroll = function(len){
    var me = this;
    if(len <= me.select.config.maxCounts){
        me.config.$listList.css({'overflow-y': 'hidden', 'height': me.select.config.itemHeight * len});
    }else{
        me.config.$listList.css({'overflow-y': 'scroll', 'height': me.select.config.listMaxHeight});
    }
    me.updateListLayout();
};

lp.updateListLayout = function(){
    var me = this, $selectList = me.select.config.$selectList;
    var showMode = me.getShowMode();
    if(showMode && showMode.indexOf('top') !== -1){
        $selectList.css({'marginTop': 1 - $selectList.height() - me.select.config.containerHeight});
    }
};

lp.getItemHtml = function(searchKey){
    var me = this, listData = me.select.config.data.list, itemHtml = [];
    var checked = this.select.config.data.checked, matchCounts = 0;

    listData.forEach(function(item, i){
        var activeClass = hasActiveClass(item), itemTxt = '';
        var checkboxChecked = activeClass.length > 0 ? 'checked="checked"' : '';

        if(me.select.isModeMultiple()){
            itemTxt = `<label><input type="checkbox" class="checkbox" ${checkboxChecked}/><div class="itemTxt mulCheckbox">${item.name}</div></label>`;
        }else{
            itemTxt = `<div class="itemTxt">${item.name}</div>`;
        }

        if (!searchKey || (searchKey && util.stringMatch((String(item.name)).toLowerCase(), searchKey.toLowerCase()) > 0)) {
            itemHtml.push(`<div class="listItem ${activeClass}" title="${item.name}" data-ref="${item.clientKey}">${itemTxt}</div>`);
            matchCounts ++;
        }
    });

    if(listData.length === 0){
        itemHtml.push(`<div class="listItem noMatch">noData</div>`);
    }else if(matchCounts === 0){
        itemHtml.push(`<div class="listItem noMatch">noMatch</div>`);
    }
    this.updateListScroll(matchCounts === 0 ? 1 : matchCounts);

    function hasActiveClass(item){
        var className = '', activeName = me.config.itemActiveName;
        if(me.select.isModeMultiple()){
            checked.forEach(function(o){
                if(isEq(o.clientKey, item.clientKey)){
                    className = activeName;
                    return true;
                }
            });
        }else{
            if(isEq(checked.clientKey, item.clientKey)){
                className = activeName;
            }
        }
        return className;
    }

    function isEq(a, b){
        return (a === b || parseInt(a, 10) === parseInt(b, 10)) ? 1 : 0;
    }
    return itemHtml.join('');
};

lp.listTabEvent = function(){
    var me = this, $tabs = me.config.$listTab.find('.tab');
    $tabs.off().on('click', function(){
        $tabs.removeClass('active');
        $(this).addClass('active');
        me.select.config.data.list = me.select.opts.data.list[$(this).index()];
        me.renderListList();
    });
    $tabs.eq(0).trigger('click');
};

lp.listListEvent = function(){
    var me = this, itemActiveName = me.config.itemActiveName;
    var selector = '.listItem';
    if(me.select.isModeMultiple()){
        selector = 'input.checkbox'
    }
    me.config.$listList.off('click', selector).on('click', selector, function(e){
        var target = $(e.target), $parent = target.closest('div.listItem');
        var hasActive = $parent.hasClass(itemActiveName), clientKey = $parent.attr('data-ref');
        var item = util.getObjByPro(clientKey, 'clientKey', me.select.config.data.list);

        if($parent.hasClass('noMatch') || $parent.hasClass('noData')  || $parent.hasClass('loading')){
            return ;
        }

        if(me.select.isModeMultiple()){
            if(hasActive){
                $parent.removeClass(itemActiveName);
                me.select.config.data.checked = util.moveObjByArray(clientKey, 'clientKey', me.select.config.data.checked)
            }else{
                $parent.addClass(itemActiveName);
                me.select.config.data.checked.push(item);
            }
        }else{
            $parent.parent().children().removeClass(itemActiveName);
            $parent.addClass(itemActiveName);
            me.select.config.data.checked = item;
        }
        me.select.selectHeader.render();

    });
};

lp.listSearchEvent = function(){
    var me = this, serverSearchOver = true;
    me.config.$inputSearch.off().on('input propertychange', function() {
        var searchKey = $.trim($(this).val());
        if(me.select.config.searchServer){
            // 防止服务端慢，多次触发
            if(!serverSearchOver){
                return ;
            }
            serverSearchOver = false;
            me.renderListListLoading();
            me.select.processStart();
            me.select.config.searchServer(searchKey, function(data){
                me.select.processEnd();
                serverSearchOver = true;

                if(data.list && data.list.length > 0){
                    me.select.config.data = data;
                    me.renderListList(searchKey);
                }else{
                    me.renderListListNoData();
                }
            });
        }else{
            me.select.processStart();
            me.renderListList(searchKey);
            me.select.processEnd();
        }
    });
};


export default List;