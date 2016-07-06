module.exports = function(grunt) {
    grunt.initConfig({
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:8000/test/tests.html',
                        'http://localhost:8000/test/tests_min.html'
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['connect', 'qunit']);
};