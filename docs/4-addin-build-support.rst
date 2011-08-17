addin build support
===================

by including r.js we can now solve dependencies at buildtime and minify js and
css, for this we first add r.js at the base of the directory, get r.js here:

https://github.com/jrburke/r.js

then we need to create a config file that sets the correct paths and options
check app.build.js, for a full example with comments see this one:

https://github.com/jrburke/r.js/blob/master/build/example.build.js

I also modified the path to make it simpler, moved the modules to js
and kept the libs in libs, I also set the baseUrl for requirejs in index.html
explicitly so it matches the one set in app.build.js

to build it and test it I run::

	$ node r.js -o app.build.js

	Tracing dependencies for: main/main

	Tracing dependencies for: jquery
	Uglifying file: /home/mariano/dev/yeies/build/js/text.js
	Uglifying file: /home/mariano/dev/yeies/build/js/main/main.js
	Uglifying file: /home/mariano/dev/yeies/build/js/libs/mustache.js
	Uglifying file: /home/mariano/dev/yeies/build/js/libs/require.js
	Uglifying file: /home/mariano/dev/yeies/build/js/libs/jquery-1.6.2.js

	js/main/main.js
	----------------
	js/libs/mustache.js
	js/text.js
	text!main/tpls/greeting.mustache
	js/main/main.js

and running a simple web server::

	$ ls
	app.build.js  build  r.js  s

	$ python -m SimpleHTTPServer
	Serving HTTP on 0.0.0.0 port 8000 ...

and visiting http://localhost:8000/build/

I get an optimized version with all the dependencies included in main/main.js

you can check that by watching the Net tab of firebug

