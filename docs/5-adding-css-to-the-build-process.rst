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

