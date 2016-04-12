module.exports = function(grunt) {

  grunt.initConfig({
    jsdoc2md: {
      oneOutputFile: {
        src: ['bin/**/*.js', 'index.js'],
        dest: 'docs.md'
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.registerTask('default', 'Default task will lint and test', ['jsdoc2md']);
};
