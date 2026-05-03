install:
	cd electron-builder && npm install

start:
	cd electron-builder && npm start

build:
	cd electron-builder && npm run build

clean:
	rm -rf electron-builder/node_modules
	rm -rf electron-builder/dist

.PHONY: install start build clean
