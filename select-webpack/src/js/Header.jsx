import { log, util } from './util.jsx';

class Header {
    constructor(select){
        this.select = select;

        this.init();
    }

}
var hp = Header.prototype;

hp.init = function(){

    this.render();
    this.headerEvent();
};

hp.render = function(){
    var checkedData = this.select.config.data.checked, headerNames = [], checkedKey = [];
    var defaultHeaderTxt = this.select.config.placeholder;

    if(this.select.isModeMultiple()){
        checkedData.forEach((item) => {
            headerNames.push(`<span class="mt" title="${item.name}"><span data-ref="${item.clientKey}" class="close"></span>${item.name}</span>`);
            checkedKey.push(item.clientKey);
        });

    }else if(checkedData){
        headerNames.push(`<span>${checkedData.name}</span>`);
        checkedKey.push(checkedData.clientKey);


    }
    if(checkedKey.length === 0){
        headerNames.push(`<span title="${defaultHeaderTxt}">${defaultHeaderTxt}</span>`);
    }

    var html = `<div class="header-container" data-ref="${checkedKey.join( )}">${headerNames.join('')}</div>`;
    this.select.config.$selectHeader.html(html);
};

hp.headerEvent = function(){
    var me = this, $selectHeader = me.select.config.$selectHeader;
    $selectHeader.off('click').on('click', function(e){
        if(me.select.config.disable){
            return true;
        }

        var selectList = me.select.selectList, $target = $(e.target);
        if($target.hasClass('close')){
            var clientKey = $target.attr('data-ref');
            me.select.config.data.checked = util.moveObjByArray(clientKey, 'clientKey', me.select.config.data.checked);
            me.render();
            me.select.selectList.renderListList();
        }else{
            if(selectList.isShow()){
                selectList.hide();
            }else{
                selectList.show();
            }
        }
    });
};


export default Header;