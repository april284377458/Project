const {app, BrowserWindow} = require('electron') 
const path = require('path');
let fs = require("fs"); 
fs.readFile("d://config.json","utf-8",function(err,data){
    let v = "{\"a\" : \"1\"}" 
    let json = JSON.parse(data);
});

let mainWindow 
function createWindow () { 
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }, 
    frame: false 
  }) 
  mainWindow.loadFile(path.join(__dirname, '../renderer/page/browser.html'))
  mainWindow.maximize();

  app.once("window-all-closed", () => {
    this.quit();
  });
}
 
app.on('ready', createWindow);
 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit()
});

 