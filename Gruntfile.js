'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    watch:{
      mochaTest:{
        files:['server/**/*.js']
        tasks:['mochaTest']
      }
    },
    mochaTest:{
      options:{
        reporter: 'spec'
      },
      src: ['server/**/*.js']
    }
  });

}
