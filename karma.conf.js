module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],

        reporters: ['progress'],
        
        files: [
            'bower_assets/cryptojslib/rollups/aes.js',
            'src/Crypt.js',
            'test/*.js'
        ],

        autoWatch: true,

        browsers: ['PhantomJS']
    });
};