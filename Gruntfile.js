module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var jshintrc = grunt.file.readJSON('.jshintrc');

    grunt.initConfig({
        cmpnt: grunt.file.readJSON('bower.json'),

        banner: '/*! crypt v<%= cmpnt.version %> by Gonzalo Ayuso(gonzalo123@gmail.com) - ' +
        'http://github.com/gonzalo123/crypt - MIT License */\n',

        jshint: {
            files: [
                'Gruntfile.js',
                'karma.conf.js',
                'src/**.js',
                'example/**.js',
                'test/**.js'
            ],
            options: {
                globals: jshintrc
            }
        },

        clean: ["dist/"],

        copy: {
            js: {
                src: 'src/crypt.js',
                dest: 'dist/crypt.js',
                options: {
                    banner: '<%= banner %>',
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR'
            }
        },

        uglify: {
            js: {
                src: ['src/crypt.js'],
                dest: 'dist/crypt.min.js',
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (fileName) {
                        return fileName.replace(/$/, '.map');
                    }
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'jshint', 'karma', 'copy', 'uglify']);
};