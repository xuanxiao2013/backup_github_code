import React from 'react';

let ArticleDetail = React.createClass({

    propTypes: {
        customProp: function (props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                //return new Error('Validation failed!');
            }
        }
    },

    getDefaultProps: function () {
        return null;
    },

    getInitialState: function () {
        return null;
    },

    render: function () {
        return <div className="ArticleDetail">ArticleDetail</div>
    },

    componentWillMount: function () {

    },

    componentDidMount: function () {

    },

    componentWillReceiveProps: function (nextProps) {

    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },

    componentWillUpdate: function (nextProps, nextState) {

    },

    componentDidUpdate: function (prevProps, nextProps) {

    },
    componentWillUnmount: function () {

    }
});

export default ArticleDetail;
