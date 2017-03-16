'use strict';

module.exports = function (grunt) {
    var cfg = {
        src: 'app/',
        dist: 'dist/',
        tmp: '.tmp/',
        serverHost: 'localhost',
        serverPort: 9000,
        livereload: 35729
    };

    grunt.initConfig({
        cfg: cfg,
        requireExcludes: grunt.file.readJSON(cfg.src + 'require-exclude.json'),
        pkg: grunt.file.readJSON('package.json'),


        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: 'checkstyle', //require('jshint-stylish'),
                reporterOutput: cfg.tmp + 'jshint-report.xml',
                force: true
            },
            all: ['app/modules/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n',
                mangle: false,
                compress: {
                    drop_console: true//É¾³ýconsole.log
                }
            },
            main: {
                files: {
                    'dist/main.js': ['dist/main.js']
                }
            }
        },
        // Optimize RequireJS projects using r.js.
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "app/main.js",
                    baseUrl: "app",
                    removeCombined: true,
                    findNestedDependencies: true,
                    dir: "dist",
                    //no minification will be done.
                    optimize: "none",
                    modules: [{
                        name: "main",
                        exclude: "<%= requireExcludes.files %>"
                    }]
                }
            }
        },
        copy: {

        },
        clean: {
            tmp: cfg.tmp,
            dist: cfg.dist
        },
        connect: {
            options: {
                port: cfg.serverPort,
                hostname: cfg.serverHost,
                livereload: cfg.livereload
            },
            dev: {
                options: {
                    open: true,
                    base: '../'
                }
            }
        },
        watch: {
            dev: {
                options: {
                    livereload: cfg.livereload
                },
                files: [
                    cfg.src + '/**/*.{html,js}'
                ]
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: [
                    cfg.src + 'components/**/*.html',
                    cfg.src + 'directives/**/*.html',
                    cfg.src + 'filters/**/*.html',
                    cfg.src + 'modules/**/*.html'
                ],
                dest: cfg.dist + 'templates.js'
            }
        },
        concat: {
            options: {
                stripBanners: true,
                separator: '\n/*! separator */\n',
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n'
            },
            gintCss: {
                src: [
                    '../Content/css/layout.css',
                    '../Content/css/style.css',
                    '../Content/css/statistics.css'
                ],
                dest: '../Content/css/gint.css'
            },
            depsCss: {
                src: [
                    '../Scripts/app/libs/ngDialog/css/ngDialog.css',
                    '../Scripts/app/libs/fullcalendar/fullcalendar.css',
                    '../Scripts/app/libs/fullcalendar/lib/cupertino/jquery-ui.min.css',
                    '../Scripts/app/libs/cropper/dist/cropper.css',
                    '../Content/css/dialog-theme-custom.css'
                ],
                dest: '../Content/css/deps.css'
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n',
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 1
            },
            gintCss: {
                src: '../Content/css/gint.css',
                dest: '../Content/css/gint.css'
            },
            depsCss: {
                src: '../Content/css/deps.css',
                dest: '../Content/css/deps.css'
            },
            target: {
                files: {
                    '../Content/css/output.min.css': [
                        '../Content/css/layout.css',
                        '../Content/css/style.css',
                        '../Content/css/statistics.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint:all']);
    grunt.registerTask('dev', ['connect:dev', 'watch:dev']);
    //grunt.registerTask('release', ['clean:tmp', 'clean:dist', 'uglify:demo', 'requirejs:compile', 'copy:demo', 'clean:tasks']);
    grunt.registerTask('release', ['clean:tmp', 'clean:dist', 'requirejs:compile', 'uglify:main', 'jshint:all']);
    grunt.registerTask('cssMinify', ['concat:gintCss', 'concat:depsCss', 'cssmin:gintCss', 'cssmin:depsCss']);
};
