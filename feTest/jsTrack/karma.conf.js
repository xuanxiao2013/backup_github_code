module.exports = function(config) {
	config.set({
		basePath: './',
		//frameworks: ['jasmine'],
		frameworks: ['mocha', 'chai-sinon', 'chai-as-promised', 'chai'],
		files: ['./tests/*.js', './src/*.js'],
		exclude: ['karma.conf.js'],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		captureTimeout: 60000,
		// false 监听运行
		singleRun: true
	});
};
