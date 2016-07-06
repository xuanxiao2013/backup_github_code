var App = React.createClass({
    getDefaultProps: function () {
        log('设置默认 props')

    },

    getInitialState: function () {
        // 必须得有返回值
        log('初始化 state')

        return {
            inputTxt: ''
        };
    },

    componentWillMount: function () {
        log('Dom 渲染前')
    },

    render: function () {
        //必须得有返回值
        log('渲染Dom')

        return <div className="appContent">
            <input className="input" placeholder="输入值后查看控制台" defaultValue={this.state.inputTxt} onChange={this.handleOnChange}/>
            <p className="txt">{this.state.inputTxt}</p>
        </div>
    },

    componentDidMount: function () {
        log('Dom 渲染后')
    },

    componentWillReceiveProps: function (nextProps) {
        log('组件接受 props 前')
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        //必须得有返回值
        log('--------------------')
        log('组件更新前钩子1')

        return this.state;
    },

    componentWillUpdate: function (nextProps, nextState) {
        log('组件更新前钩子2')
    },

    componentDidUpdate: function (prevProps, prevProps) {
        log('组件更新后')
    },

    componentWillUnmount: function () {
        log('组件销毁')
    },

    handleOnChange: function(e){
        this.setState({
            inputTxt: e.target.value
        })
    }
});
React.render(<App />, document.getElementById('app'));

