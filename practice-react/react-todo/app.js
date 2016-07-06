const eventKey_selectAll = 'todo.selectAll', eventKey_addTodo = 'todo.push', eventKey_typeTodo = 'todo.type';
const optsBtn_all = 'all', optsBtn_noSelect = 'noSelect', optsBtn_selected = 'selected',optsBtn_clean = 'clean';

var appEvent = {};
appEvent.on = function(eventKey, callback){
    $(appEvent).off(eventKey).on(eventKey, callback);
};
appEvent.trigger = function(eventKey, arg){
    $(appEvent).trigger(eventKey, arg);
};


var TodoHeader = React.createClass({
    getInitialState: function () {
        return {
            isSelectAll: this.props.isSelectAll
        }
    },
    render: function(){
        var checked = this.state.isSelectAll ? 'checked' : '';
        return <div className="todoHeader">
            <input type="checkbox" onChange={this.checkboxOnChange} defaultChecked={checked}/>
            <input className="inputAdd" onKeyPress={this.inputOnKeyPress} placeholder="请输入值后，回车添加"/>
            {checked}
        </div>;
    },

    checkboxOnChange: function(e){
        appEvent.trigger(eventKey_selectAll, [!this.props.isSelectAll]);
        this.setState({ isSelectAll: !this.props.isSelectAll});
    },

    inputOnKeyPress: function(e){
        var value = e.target.value;
        if(e.which === 13 && value.trim().length > 0){

            e.target.value = '';
            appEvent.trigger(eventKey_addTodo, [{
                id: new Date().getTime(),
                selected: false,
                title: value
            }]);
        }
    },
    componentDidMount: function () {
        var $this = this;
    }
});

var TodoList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function(){
        var $this = this, items = [], active = $this.props.active;
        if(active === 'all'){
            $this.props.items.forEach(function(item, i){
                items.push(getItem(item));
            });
        }else if(active === 'noSelect'){
            $this.props.items.forEach(function(item, i){
                if(!item.selected){
                    items.push(getItem(item));
                }
            });
        }else if(active === 'selected'){
            $this.props.items.forEach(function(item, i){
                if(item.selected){
                    items.push(getItem(item));
                }
            });
        }
        function getItem(item){
            var checked = item.selected ? 'checked' : '', txtClassName = ['txt'];
            var selectTxt = item.selected ? 'selectTxt' : '';
            txtClassName.push(selectTxt);
            return <p key={item.id}>
                <input type="checkbox" defaultChecked={checked} onChange={$this.itemOnChange.bind($this, item.id)}/>
                <span className={txtClassName.join(' ')}>{item.title}-{checked}</span>
            </p>;
        }
        return <div className="todoList">
            {items}
        </div>;
    },


    itemOnChange: function(dataKey, e){
        var $target = $(e.target);
        this.props.items.forEach(function(item, i){
            if(item.id * 1 === dataKey * 1){
                item.selected = $target.attr('checked');
                return false;
            }
        });
        if($target.attr('checked')){
            $target.next().addClass('selectTxt');
        }else{
            $target.next().removeClass('selectTxt');
        }
    }
});


var TodoFooter = React.createClass({

    render: function(){
        var $this = this, items = [];
        $this.props.optsBtn.forEach(function(item, i){
            var selectName = $this.props.active === item.key ? 'selected' : '';
            items.push(<a key={item.key} onClick={$this.activeClick.bind($this, item.key)} className={selectName}>{item.name}</a>);
        });
        return <div className="todoFooter">
            <span className="txt">{$this.props.noSelectCounts} no selected</span>
            <div className="btns">
                {items}
            </div>
        </div>;
    },

    activeClick: function(key, e){
        appEvent.trigger(eventKey_typeTodo, [key]);
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            active: optsBtn_all,
            isSelectAll: false,
            items:[{
                id: new Date().getTime(),
                title: 'hello react'
            },{
                id: new Date().getTime() - 1111,
                title: 'hello react todo'}]
        }
    },

    getDefaultProps: function () {
        var optsBtn = [
            { key: optsBtn_all, name: 'all'},
            { key: optsBtn_noSelect, name: 'noSelect'},
            { key: optsBtn_selected, name: 'selected'}
            //,{ key: optsBtn_clean, name: 'clean selected'}
        ];

        return {
            optsBtn: optsBtn
        }

    },

    componentWillMount: function () {
        var isSelectAll = this.state.isSelectAll;
        this.state.items.forEach(function(item, i){
            item.selected = isSelectAll;
        });
    },

    render: function(){
        var state = this.state, props = this.props;
        return <div className="appContainer">
            <TodoHeader
                isSelectAll={state.isSelectAll}
            />
            <TodoList
                isSelectAll={state.isSelectAll}
                active={state.active}
                items={state.items}
            />
            <TodoFooter
                noSelectCounts={state.items.length}
                optsBtn={props.optsBtn}
                active={state.active}
            />
        </div>;
    },

    componentDidMount: function () {
        var $this = this;
        appEvent.on(eventKey_typeTodo, function(e, active){
            $this.setState({
                active: active
            });
        });

        appEvent.on(eventKey_addTodo, function(e, o){
            $this.state.items.push(o);
            $this.setState({items: $this.state.items});
        });

        appEvent.on(eventKey_selectAll, function(e, isSelectAll){
            $this.state.items.forEach(function(item){
                item.selected = isSelectAll;
            });
            $this.setState({
                items: $this.state.items,
                isSelectAll: isSelectAll
            });
        });
    }
});

React.render(<App />, document.getElementById('app'));
