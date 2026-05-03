# kirigraph
 
kirigraph is a minimal dark text editor built on electron and node.js. it's designed to behave like a real native app rather than a web page stuffed into a window.
 
# code wise explanation
you will find an explanation about the code inside of here if you are familiar with electron but dont want to read the code its self.

## save system
the save system keeps currentFilePath in the main process rather than trying to sync it with the renderer. the renderer sends content, gets a file path back, and both sides stay in sync. this avoids the silent save failures that are really easy to run into with electron if you're not careful.
## custom title bar
-webkit-app-region: drag goes on the bar itself, and -webkit-app-region: no-drag on the window control buttons. this makes it behave like a native title bar without any default os chrome interfering.
### dropdown animations
dropdowns animate using transform: scaleY() with transform-origin: top center instead of height or max-height. this keeps the animation on the gpu and avoids layout recalculations on every frame.
dependencies
no runtime dependencies. everything uses electron or node's standard library. the only dev dependencies are electron itself and electron-builder for packaging.
```
git clone https://github.com/Kiritoasty/kirigraph.git
cd kirigraph
cd electron-builder
npm install
```

other commands to use if building from source:
- `npm run build` (run with administrator, this creates the installer with the icon.ico you have in the folder for electron-builder.)
- `npm start` (test the application, this will open up electron and start the application with it if needing to test)
