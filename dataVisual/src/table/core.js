if(typeof require == 'undefined'){
	require('./global');
}


	
function Table() {
	this._init.apply(this, arguments);
}

Table.prototype = {
	_init : function() {
		var that = this;
		that.setContext();
	},
	setContext : function() {
		return this;
	}
}

DV.extend(Table.prototype, {
	addColumn : function(config, index) {

	},
	modifyColumn : function(name, config) {

	},
	moveColumn: function (name, index) {
		
	},
	removeColumn: function (name) {
		
	},
	addRow: function (data, config) {
		
	},
	removeRow: function (id, config) {
		
	},
	modifyRow: function (id, data, config) {
		
	},
	initializer: function () {
    }

});

// 列属性
function Column(o) {
	// 数据行中通过这个字段来获取数据
	this.key = o.key || 'key';
	// 通过这个来获取整列
	this.name = o.name || 'name';
	// name 的别名
	this.field = o.field || 'name';
	// 指定id，这个要 小心使用，避免冲突
	this.id = o.id || 'columnId';
	// 填充的内容
	this.label = o.label || 'label';
	// 没有层级限制，可以是无限极，只能创建一个子列
	this.children = o.children || [];
	// title 属性
	this.title = o.title || 'title';
	// 格式化内容
	this.formatter = o.formatter || '';
	// 内容为空的时候处理
	this.emptyCellValue = o.emptyCellValue || '';
	// 是否允许为html
	this.allowHTML = !!o.allowHTML;
	// 样式名字
	this.className = o.className || '';
	// 排序
	this.sortable = !!o.sortable;
	// 排序函授
	this.sortFn = o.sortFn || function() {
	};
	// 排序方向
	this.sortDir = o.sortDir || 1;
	// 气泡提示
	this.tipable = !!o.tipable;
	// 设置列宽，按照权重设置
	this.width = o.width || '';
	// 权重，这个权重在显示的时候用，当在容器显示不下的时候，权重低的优先隐藏起来
	this.weight = o.weight || 1;
}
// 格式化属性
function Formatter(o) {
	// Column.label
	this.value = '';
	// model
	this.data = ''
	// Column.className
	this.className = '';
	// 当前行索引
	this.rowIndex = '';
	// 行样式
	this.rowClass = '';
	// Column 对象
	this.column = 'Column';
	// The Model for this row
	this.record = '';
}
new Table();
