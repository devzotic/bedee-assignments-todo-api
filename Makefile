clean:
	npm run clean
	
build: clean
	npm run build

dev: build
	npm run dev

start: build
	npm run start
