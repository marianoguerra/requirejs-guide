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

