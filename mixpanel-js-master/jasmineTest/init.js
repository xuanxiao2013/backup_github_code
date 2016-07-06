mixpanel.init("MIXPANEL_TOKEN", {
        cookie_name: "test",
        reset_cookie: true,
        debug: false,
        loaded: function(mixpanel) {
            //testMixpanel(mixpanel);
        }
    });

testAsync(mixpanel);