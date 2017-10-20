.PHONY: all serve open images

imgs := $(shell ag -g '\.original\.(jpg|png|gif)$$')
imgs := $(subst .original.,.,$(imgs))

all: open serve

serve:
	bundle exec jekyll serve --incremental

open:
	open http://localhost:4000/

images: $(imgs)

%.png: FORCE
	pngcrush $@

%.jpg: %.original.jpg
	guetzli \
		--quality 80 \
		$< $@
	jpegoptim \
		--strip-all \
		--max=85 \
		--all-progressive \
		--stdout \
		$< \
		> $@

FORCE:
