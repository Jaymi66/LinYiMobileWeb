module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js', 'routes/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            // uglify: {
            //     files: ['public/**/*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: true
            //     }
            // },
            // styles: {
            //     files: ['public/**/*.less'],
            //     tasks: ['less'],
            //     options: {
            //         nospawn: true
            //     }
            // }
        },

        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc',
        //         ignores: ['public/libs/**/*.js']
        //     },
        //     all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        // },

        // less: {
        //     development: {
        //         options: {
        //             compress: true,
        //             yuicompress: true,
        //             optimization: 2
        //         },
        //         files: {
        //             'public/build/index.css': 'public/less/index.less'
        //         }
        //     }
        // },

        // uglify: {
        //     development: {
        //         files: {
        //             'public/build/admin.min.js': 'public/js/admin.js',
        //             'public/build/detail.min.js': [
        //             'public/js/detail.js'
        //             ]
        //         }
        //     }
        // },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        // mochaTest: {
        //     options: {
        //         reporter: 'spec'
        //     },
        //     src: ['test/**/*.js']
        // },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    
    // 监听文件修改
    grunt.loadNpmTasks('grunt-contrib-watch')
    // 实时监听入口文件 出现改动会重启服务
    grunt.loadNpmTasks('grunt-nodemon')
    // 慢任务的  比如less，sass
    grunt.loadNpmTasks('grunt-concurrent')
    
    // grunt.loadNpmTasks('grunt-mocha-test')
    // grunt.loadNpmTasks('grunt-contrib-less')
    // grunt.loadNpmTasks('grunt-contrib-uglify')
    // grunt.loadNpmTasks('grunt-contrib-jshint')

    // 语法错误不中断
    grunt.option('force', true)

    // 传入任务
    grunt.registerTask('default', ['concurrent'])

    // grunt.registerTask('test', ['mochaTest'])
}