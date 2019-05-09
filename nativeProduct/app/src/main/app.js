import path from "path";
import { app, BrowserWindow } from "electron"; 
app.commandLine.appendSwitch("--disable-background-timer-throttling"); 

class MHomeWindow extends BrowserWindow {
    
    constructor(width, height) {
        super({ width: width, height: height, webPreferences: { devTools: true }, frame: false });
        this._name = path.basename(file, ".html");
        this._file = path.resolve(__dirname, `../renderer/pages/home.html`); 
    }

    open() {
        this.loadFile(this._file);
    }
}

let win;

const createWindow = ()=>{
    win = new MHomeWindow(1200,800); 
    win.open();   
    win.once('closed', () => { 
        win = null
    });
}


app.on('window-all-closed', () => { 
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
app.on('activate', () => { 
    if (mainWindow === null) {
        createWindow()
    }
});
  

app.once("ready", createWindow);

 
 
   