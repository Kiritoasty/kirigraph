# enceladus.editor


enceladus.editor is a weirdly cool text editor (my first electron project) that has very few dependencies and has a soothing feel because of rendering optimizations with electron so animations dont BALL OUT inside of tears to the gpu because you haven't optimized your keyframe css.

# code wise explanation

you will find an explanation about the code inside of here if you are familiar with electron but dont want to read the code its self.

## save system

when i was making this i decided that currentFilePath should be managed by the main process. doing this makes it non-synced with the renderer. the renderer sends your awesome face content and gets a file path back. this keeps things fairly simple and prevents silent save failures which is a pretty common struggle in the creation of MOST of electron apps.

## custom title bar

uses -webkit-app-region: drag on the bar and -webkit-app-region: no-drag on the window control buttons. made to work like a native title bar without the default os title bar getting in the way that doesn't look so nice on applications like this.

## dropdown animations

dropdowns use transform: scaleY() with transform-origin: top center instead of height or max-height as their keyframe css. using this method optimizes the animation to the gpu and skips layout redoings every frame you use this app, so it stays smooth.

## dependencies

no runtime dependencies at all. everything relies on electron or node's standard library. only dev dependencies are electron and electron-builder for packaging.



# build kirigraph from the ground up



inside of here, you will get a script that you can use to build kirigraph from source. doing it is easy because of how low the code-amount is.
```
git clone https://github.com/nixtoasty/enceladus-editor.git
cd enceladus-editor
cd electron-builder
npm install

```



other commands to use if building from source:

- `npm run build` (run with administrator, this creates the installer with the icon.ico you have in the folder for electron-builder.)

- `npm start` (test the application, this will open up electron and start the application with it if needing to test)
