/**
 * Created by Administrator on 2014/12/31.
 */
module.exports = function(grunt){
    grunt.initConfig({
        seajs_converter: {
            js : {
                options:{
                    base : "js"
                },
                files : [{
                    expand : true,
                    cwd : "js",
                    src : "**/*.js",
                    dest : "tmp/transport/js"
                }]
            },
            config : {
                options : {
                    base : "lib"
                },
                files : {
                    "tmp/transport/lib/config.js" : "lib/config.js"
                }
            }
        },
        seajs_concat : {
            options:{
                base : "tmp/transport/js",
                paths:{
                    "index":"page/index"
                }
            },
            seajs : {
                options:{
                    includes:["lib/sea-debug.js"]
                },
                files : {
                    "tmp/concat/lib/sea-debug.js" : ["tmp/transport/lib/config.js"]
                }
            },
            main : {
                options: {
                    excludeDependencies: ["jquery"]
                },
                files:{
                    "tmp/concat/js/main.js" : ["tmp/transport/js/main.js"]
                }
            }
        },
        uglify : {
            compress : {
                options:{
                    report:"gzip",
                    sourceMap : true,
                    sourceMapName: 'tmp/minify/sourcemap.map'
                },
                files :[{
                    expand : true,
                    cwd : "tmp/concat",
                    src : "**/*.js",
                    dest : "tmp/minify"
                }]
            }
        },
        clean:{
            minify:["tmp"]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-seajs-converter')
    grunt.loadNpmTasks('grunt-seajs-concat')
    grunt.loadNpmTasks("grunt-contrib-uglify")
    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean','seajs_converter',"seajs_concat","uglify"]);

}