// Generated on 2014-04-24 using generator-jhipster 0.13.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'src/main/webapp',
            dist: 'dist'
        },
        watch: {
            compass: {
                files: ['src/main/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.app %>/style/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%= yeoman.app %>/angular/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp/,}<%= yeoman.app %>/angular/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/webapp/style/',
                        src: 'main.css',
                        dest: 'src/main/webapp/style/'
                    }
                ]
            }
        },
        connect: {
            proxies: [
                {
                    context: '/',
                    host: 'localhost',
                    port: 8080,
                    https: false,
                    changeOrigin: false
                },
                {
                    context: '/jira/auth',
                    host: 'localhost',
                    port: 8080,
                    https: false,
                    changeOrigin: false
                }
            ],
            options: {
                port: 9000,
                // Change this to 'localhost' to deny access to the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        'src/main/webapp'
                    ],
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            connect.static(require('path').resolve('src/main/webapp'))
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '.'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/main/webapp/angular/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                sassDir: 'src/main/scss',
                cssDir: 'src/main/webapp/style',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: 'images',
                javascriptsDir: '<%= yeoman.app %>/angular',
                fontsDir: '<%= yeoman.app %>/bower_components/bootstrap-sass/vendor/assets/fonts/bootstrap',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '<%= yeoman.app %>/images',
                httpGeneratedImagesPath: '<%= yeoman.app %>/images/generated',
                httpFontsPath: '<%= yeoman.app %>/style/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/main/webapp/style',
                src: ['main.css', '!*.min.css'],
                dest: 'src/main/webapp/style',
                ext: '.css'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 2
            },

            server: [
                'compass:server'
            ]
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'concurrent:server',
            'autoprefixer',
            'configureProxies',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'jshint',
        'compass:dist',
        'autoprefixer',
        'cssmin'
    ]);
};
