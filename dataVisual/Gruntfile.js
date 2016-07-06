/*global cp, mkdir*/
require("shelljs/global");
var fs = require("fs"),
    path = require("path");
fs.existsSync = fs.existsSync || path.existsSync;

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build: ["./dist/"]
        },
        nodeunit: {
            all: ["test/table/core.js"]
        },
        watch: {
            files: ["./src/*.js", "./src/**/*.js"],
            tasks: "default"
        },
        jshint: {
            all: ["Gruntfile.js", "./src/global.js", "./src/table/core.js"]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.registerTask("default", ["clean", "jshint", "nodeunit"]);
};
