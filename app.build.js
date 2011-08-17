({
    // read for details:
    //  https://github.com/jrburke/r.js/blob/master/build/example.build.js
    appDir: "s/",
    baseUrl: "js/",
    dir: "build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS.
    //optimize: "none",

    paths: {
        "jquery": "libs/jquery-1.6.2"
    },

    modules: [
        {
            name: "main/main",
            exclude: ["jquery"]
        }
    ]
})
