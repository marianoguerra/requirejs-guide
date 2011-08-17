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

