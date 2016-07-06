var sinon = require('sinon')
var assert = require('chai').assert
var sum = require('../src/sum.js');


function getTodos(listId, callback) {
    jQuery.ajax({
        url: "/todo/" + listId + "/items",
        success: function (data) {
            // Node-style CPS: callback(err, data)
            callback(null, data);
        }
    });
}


describe.only('fake test', function () {
    var server;
    before(function () {
        server = sinon.fakeServer.create();
    });
    after(function () {
        server.restore();
    });

    /*
    it("calls callback with deserialized data", function () {
        var callback = sinon.spy();
        //getTodos(42, callback);

        // This is part of the FakeXMLHttpRequest API
        server.requests[0].respond(
            200,
            {"Content-Type": "application/json"},
            JSON.stringify([{id: 1, text: "Provide examples", done: true}])
        );

        assert(callback.calledOnce);
    });
*/
})