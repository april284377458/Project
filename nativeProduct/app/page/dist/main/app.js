// setTimeout(() => {
//   let fs  = require("fs");  
// let rs = fs.createReadStream("d://test.text");
// let chunks = []; 
// var size = 0;
// var data = '';
// rs.setEncoding("utf-8");
// rs.on("data",function(chunk){
//     data += chunk;
// // chunks.push(chunk); 
// // size += chunk.length;
// }); 
 
// rs.on("end",function(){
//     // var buf = Buffer.concat(chunks,size);
//     // var str = iconv.decode(buf,'utf-8');
//     console.log("-"+ data); 
// })

// }, 2000);


const {app, BrowserWindow} = require('electron') 
const path = require('path') 

let mainWindow

function createWindow () { 
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  }) 
  mainWindow.loadFile(path.join(__dirname, '../renderer/page/browser.html'))
  

  app.once("window-all-closed", () => {
    this.quit();
  });
}
 
app.on('ready', createWindow)
 
app.on('window-all-closed', function () { 
  if (process.platform !== 'darwin') app.quit()
});

 