const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const ipcMain = remote.ipcMain;
const {ipcRenderer} = require('electron');
const dialog = remote.dialog;
ipcMain.on('other', (event, str) => {
    const laber = document.getElementById('laber_return');
    laber.innerHTML += str;
});

function onClick_getSize() {
    const win = remote.getCurrentWindow();
    console.log('宽度：' + win.getSize()[0]);
    console.log('高度：' + win.getSize()[1]);
    console.log('X：' + win.getPosition()[0]);
    console.log('Y：' + win.getPosition()[1]);
}

function onClick_setSize() {
    const win = remote.getCurrentWindow();
    win.setSize(750, 750);
    win.setPosition(0, 0)

}

function onClick_setKiosk(e) {
    const win = remote.getCurrentWindow();
    if (win.isKiosk()) {
        win.setKiosk(false);
        e.innerHTML = '设置窗口全屏及锁定';

    } else {
        win.setKiosk(true);
        e.innerHTML = '窗口已销定';
    }
}

function onClick_Close() {
    const win = remote.getCurrentWindow();
    win.close();
}

function onClick_CloseManyWindow() {
    if (global.windows != undefined) {
        for (var i = 0; i < global.windows.length; i++) {
            global.windows[i].close();
        }
        global.windows.length = 0;
        global.windows = undefined;
    }

}

function onClick_CreateManyWindow() {
    if (global.windows == undefined) {
        global.windows = [];
    }
    var win = new BrowserWindow({
        show: false,
        width: 200,
        height: 200
    });
    global.windows.push(win);
    win.loadFile('./index3.html');
    win.on('ready-to-show', () => {
        win.show();
    })

}

function onClick_SendData() {
    var win = new BrowserWindow({
        width: 800,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
    });
    win.loadFile('other.html');
    win.once('ready-to-show', () => {
        win.show();
        win.webContents.send('data', {name: 'bill', age: 25});
    });
    win.webContents.openDevTools();
}

function onLoad() {
    ipcRenderer.on('data', (event, obj) => {
        const name = document.getElementById('name');
        const age = document.getElementById('age');
        name.innerHTML = obj.name;
        age.innerHTML = obj.age;
    })
}

function onClick_CloseOther() {
    const win = remote.getCurrentWindow();
    ipcRenderer.send('other', '窗口已关闭');
    win.close();
}

function onClick_OpenFile() {
    const onClick_OpenFile = document.getElementById('onClick_OpenFile');
    var options = {};
    options.title = "打开文件夹";
    options.properties = ['openFIle', 'multiSelections'];
    options.buttonLabel = '选择您要的文件';
    options.filters = [
        {name: 'Images', extensions: ['jpg', 'png', 'gif']},
        {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
        {name: 'Custom File Type', extensions: ['as']},
        {name: 'All Files', extensions: ['*']}
    ];
    //如果是苹果系统，增加添加文件夹功能
    if (process.platform == 'darwon') {
        options.properties.push('openDirectory');
    }
    onClick_OpenFile.innerHTML = dialog.showOpenDialog(options, (file) => {
        console.log(file);
    })
}