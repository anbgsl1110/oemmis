"use strict";

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            'app/libs/angular/angular.js', {
                pattern: 'app/**/*.js',
                included: false
            }, {
                pattern: 'test/mock/**/*.js',
                included: false
            }, {
                pattern: 'test/spec/**/*.js',
                included: false
            },
            'test/test-main.js',
            'app/**/*.html'
        ],


        // list of files to exclude
        exclude: [
            'app/main.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.html': ['ng-html2js'],
            'app/modules/**/*.js': 'coverage'
        },


        ngHtml2JsPreprocessor: {
            // you might need to strip the main directory prefix in the URL request
            stripPrefix: 'app/',
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('ngTemplates')
            moduleName: 'ngTemplates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }

        /*plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-requirejs',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }*/
    });
};
