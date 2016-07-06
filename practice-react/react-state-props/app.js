

var Outer = React.createClass({

    getInitialState: function() {
        return {data: {value: 'at first, it works'}};
    },

    handleClick: function () {
        //1) this doesn't work, render is not triggered
        //never set state directly because the updated values can still be read and lead to undefined behavior
        this.state.data.value = 'but React will never know!';

        //2) this works, because we use setState
        var newData = {value: 'it works 2'};
        this.setState({data: newData});

        //3) alternatively you can use React's immutabilty helpers for updating more complex models.
        //http://facebook.github.io/react/docs/update.html
        //var newState = React.addons.update(this.state, {
        //    data: {value: {$set: 'it works'}}
        //});
        //this.setState(newState);
        //log(this.props.data.value)
    },

    render: function() {
        return <Inner data={this.state.data} handleClick={this.handleClick} />;
    }
});


var Inner = React.createClass({
    render: function() {
        return <button onClick={this.props.handleClick}>{this.props.data.value}</button>;
    }
});
React.render(<Outer />, document.getElementById('app'));

