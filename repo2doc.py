import sys

def process(content, separator="%-%-%-%\n", outdir="docs"):
    chapters = content.split(separator)

    for number, chapter in enumerate(chapters):
        if not chapter.strip():
            continue

        filename, title, body = chapter.split("\n", 2)

        if not body.strip():
            print "ignoring '%s' because of empty body" % title

        else:
            path = "%s/%d-%s" % (outdir, number, filename)
            handle = open(path, "w")

            handle.write(title)
            handle.write("\n")

            handle.write("=" * len(title))
            handle.write("\n" * 2)

            handle.write(body)
            handle.close()

if __name__ == "__main__":
    # git log --reverse --format="%f.rst%n%s%n%b%n%%-%%-%%-%%" | python repo2doc.py
    process(sys.stdin.read())
