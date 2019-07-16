const {app, BrowserWindow} = require('electron')

function createWindow() {
    // 创建浏览器窗口
    // width height minWidth  maxWidth默认单位px
    //x y 在屏幕上的位置
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // 加载index.html文件
    win.loadFile('index.html');
    // 显示调试窗口
    win.webContents.openDevTools();

}

app.on('ready', createWindow)