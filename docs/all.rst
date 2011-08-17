initial setup
=============

to start I created a simple html file that loads require.js and
then loads the *entry point* module in js/mods/main

this module depends on jquery so it loads it, when jquery is loaded
and the document is ready it changes the page title.

add .gitignore
==============

like every git project ignore files like temporary files, or
files created by your text editor, in this case, vim swap files

loading text with the text.js plugin
====================================

to load text content like templates and html we will use the
text.js plugin from requirejs:

http://requirejs.org/docs/api.html#text

we need to put it on the same directory where the main module
is located and put the required files with the "text!" prefix

requirejs will load those files and pass them as parameters

in this case I created a simple template using mustache called
greeting.mustache and I loaded it in mod/main/main.js

of course I included mustache.js in js/libs/

get mustache from

http://mustache.github.com/

then I just render the template passing some json and I append
it to the body

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

adding css to the build process
===============================

I added normalize.css:

http://necolas.github.com/normalize.css/

and my own style, I used @import in my css to load normalize.css

after building normalize.css is inserted in main.css so only one
css file is requested to the server.

after this steps we have a page that does 5 requests to the server

index.html
require.js
main.js
main.css
jquery-1.6.2.js

we save a lot of roundtrips and asynchronouse handling by using
require.js

