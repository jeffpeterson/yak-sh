.PHONY: all serve open images

all: open serve

serve:
	bundle exec jekyll serve --incremental

open:
	open http://localhost:4000/

images: **/*.jpg

%.png: FORCE
	pngcrush $@

%.jpg: FORCE
	jpegoptim --strip-all --all-progressive $@

FORCE:
