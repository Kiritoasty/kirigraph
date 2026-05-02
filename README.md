# kirigraph
 
kirigraph is a minimal dark text editor built on electron and node.js. it's designed to behave like a real native app rather than a web page stuffed into a window.
 
## code-wise terms
 
the file loading sequence is built around `did-finish-load` rather than `ready-to-show`, which is the correct event to hook into when you need the renderer to be fully ready before sending ipc messages. most electron notepad tutorials get this wrong and wonder why "open with" doesn't work.
 
the save system keeps `currentFilePath` owned entirely by the main process rather than syncing it between main and renderer. the renderer just passes content through and gets a file path back. this means the two processes can never disagree about where a file lives, which is a common source of silent save failures in beginner electron apps.
 
the custom title bar uses `-webkit-app-region: drag` on the bar itself with `-webkit-app-region: no-drag` carved out for the window control buttons, which lets it behave exactly like a native title bar without any of the default os chrome.
 

the dropdown menus animate using transform: scaleY() with transform-origin: top center rather than height or max-height animations, which means the browser can composite the animation on the gpu instead of triggering layout recalculations on every frame.
there are no runtime dependencies. everything is either built into electron or node.js's standard library. the only devdependencies are electron itself and electron-builder for packaging.
# how to install kirigraph
when you want to install kirigraph, inside of the website ( https://kiritoasty.dev/kirigraph/ ), you will see a .zip file (portable) that you will have to extract, most of operating systems will have that built by default (duh) and you will be able to just use that.
after extracting it, go into the dist folder and then go into the Kirigraph Setup (version).exe and click next on all of the prompts unless you want to install it to a different directory (not recommended if generally using it, doing the default program files destination is better for most use cases)
# how to build kirigraph from source
