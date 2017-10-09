all: open serve

serve:
	bundle exec jekyll serve --incremental

open:
	open http://localhost:4000/
