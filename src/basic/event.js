const remote = require("electron").remote;

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