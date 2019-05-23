let { app, BrowserWindow } = require("electron") ; 
app.commandLine.appendSwitch("--disable-background-timer-throttling");  

let win; 
const createWindow = ()=>{
    win = new BrowserWindow({ width: 1000, height: 600, webPreferences: { devTools: true ,nodeIntegration : true, nodeIntegrationInWorker: true}, frame: false}); 
    win.loadFile("./dist/renderer/pages/home.html");  
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

 
 
   