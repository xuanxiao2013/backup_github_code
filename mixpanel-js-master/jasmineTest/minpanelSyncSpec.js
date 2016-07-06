
var untilDone = function(func, next) {
    var timeout = setTimeout(function() {
        //ok(false, 'timed out');
        console.log('time out')
        next();
    }, 5000);
    var interval;
    interval = setInterval(function() {
        func(function() {
            clearTimeout(timeout);
            clearInterval(interval);
            next();
        });
    }, 20);
};




window.testAsync = function() {
    describe("async", function () {


        var originalTimeout;
        beforeEach(function() {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        });

        //it("takes a long time", function(done) {
        //    setTimeout(function() {
        //        done();
        //    }, 5000);
        //});

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

        it('async tracking', function(done){
            var test1 = {
                id: "asjief32f",
                name: "bilbo",
                properties: null
            };
            mixpanel.push(function() {
                this.persistence.clear();
            });

            mixpanel.time_event('test');
            mixpanel.track('test', {}, function(response, data) {
                test1.properties = data.properties;
            });
            var lib_loaded = mixpanel.__loaded;
            mixpanel.identify(test1.id);
            mixpanel.name_tag(test1.name);

            if (!lib_loaded) {
                untilDone(function(d) {
                    if (test1.properties !== null) {
                        var p = test1.properties;
                        expect(p.mp_name_tag).toEqual(test1.name);
                        expect(p.distinct_id).toEqual(test1.id);
                        expect(_.isUndefined(p.$duration)).not.toBeDefined();
                        //same(p.mp_name_tag, test1.name, "name_tag should fire before track");
                        //same(p.distinct_id, test1.id, "identify should fire before track");
                        //ok(!_.isUndefined(p.$duration), "duration should be set");
                        //d();
                    }
                }, done);

            } else {
                var warning = 'mixpanel-js library loaded before test setup; skipping async tracking tests';
                console.log(warning);
            }
        });
    });


};