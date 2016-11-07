module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');

  grunt.initConfig({

    webpack: {
      web_cli: require('./src/builds_configs/web_cli/webpack.config.js'),
      chrome:  require('./src/builds_configs/chrome/webpack.config.js'),
    }

  });

  grunt.registerTask('default', ['webpack']);
};
