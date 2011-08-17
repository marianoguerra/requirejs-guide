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

a note on Tutorial Driven Development
=====================================

today I decided to investigate some tools like requirejs...

but it always happens to me that at the first stages I'm getting
huge amounts of information that I don't record anywhere.

then later I forget how I did them, where I find them and worst
if I have to explain to someone else what I learned it's hard
to remember everything or the steps I did, the little details and
so on.

so this time I decided to do something that I thought when started
to research, there is a place where I have to write something of
what I do at the precise moment I made it work, and that is the
commit message of my VCS.

at that point I still remember what I did, where I got the stuff
I included (I even still have the tabs open in my browser) and
better than that, if I write a descriptive commit not only I have
a nice step by step guide but it's associated with the changes I
did in the repository.

on top of that it's really simple to automate generating nice
documentation from this, in this commit I'm importing a small
script that process the git commits that have a body and creates
a restructured text file for each of the commits in an output
folder.

after this I convert the numerated "chapters" with rst2html and
a really cool css from:

http://kevinburke.bitbucket.org/markdowncss

and I get automatically beautiful static documentation.

the steps to generate the documentation right now are::

	git log --reverse --format="%f.rst%n%s%n%b%n%%-%%-%%-%%" | python repo2doc.py
	cd docs
	rm all.rst
	cat *.rst > all.rst
	rst2html --stylesheet-path=markdown.css all.rst > all.html

stuff to refine
---------------

a better workflow for Tutorial Driven Development with something
like a branch for each chapter or something like that.

this is all for now, if I keep improving this guide I just have
to run the script again to get the new version of the document.

happy tutDD (TDD is already taken ;)

