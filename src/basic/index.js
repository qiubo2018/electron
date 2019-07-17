const {app, BrowserWindow} = require('electron');

function createWindow() {
    // 创建浏览器窗口
    // width height minWidth  maxWidth默认单位px
    //x y 在屏幕上的位置
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        // 更多设置可以参考：https://electronjs.org/docs/api/browser-window#winsetkioskflag
        //边框
        // frame: false,
        //全屏+锁定
        // fullscreen: true,
        // kiosk: true
        //title 如果在网页中设置了，这里无效
        title: 'aaaa',
        icon: '../img/icon.png',
        show: false
    });

    // 加载index.html文件
    win.loadFile('index.html');
    win.on('ready-to-show', () => {
        win.show();
    });

    // 显示调试窗口
    win.webContents.openDevTools();

}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    console.log('window-all-closed');
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    console.log('activate');
    if (win == null) {
        createWindow();
    }
});