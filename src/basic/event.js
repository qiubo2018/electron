const remote = require('electron').remote;

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