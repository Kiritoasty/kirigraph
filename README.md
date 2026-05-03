# kirigraph
 
kirigraph is a minimal dark text editor built on electron and node.js. it's designed to behave like a real native app rather than a web page stuffed into a window.
 
## code-wise terms
the save system keeps the currentFilePath completely under the control of the main task, instead of trying to sync it between the main and renderer processes. the renderer sends content through and then receives a file path in return. this setup ensures that both tasks always know exactly where a file is located, which helps prevent the silent save failures that often trip up beginners working with electron apps.

for the custom title bar, this uses -webkit-app-region: drag on the bar itself, while -webkit-app-region: no-drag is applied to the window control buttons. this allows it to function just like a native title bar, without any of the default OS chrome getting in the way.

The dropdown menus animate using transform: scaleY() with transform-origin set to top center, rather than relying on height or max-height animations. This approach lets the browser handle the animation on the GPU, avoiding the need for layout recalculations on every frame. there are no runtime dependencies. everything is either part of Electron or included in node.js's standard library. The only development dependencies are Electron itself and electron-builder for packaging.
# how to build kirigraph from source
building kirigraph from source is very simple. all you will need is `npm` and `git` (if you want to build this from source on windows, then get the lts node version from https://nodejs.org, and get git for windows from https://git-scm.com/install/windows)
here is the full script (use on powershell if using windows)
```
git clone https://github.com/Kiritoasty/kirigraph.git
cd kirigraph
cd electron-builder
npm install
```

other commands to use if building from source:
- `npm run build` (run with administrator, this creates the installer with the icon.ico you have in the folder for electron-builder.)
- `npm start` (test the application, this will open up electron and start the application with it if needing to test)
