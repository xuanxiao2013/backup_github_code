var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
	spec_dir: 'tests',
	spec_files: [
		'utils/**/*[sS]pec.js'
	]
});

jasmine.configureDefaultReporter({
	showColors: true
});
jasmine.execute();

