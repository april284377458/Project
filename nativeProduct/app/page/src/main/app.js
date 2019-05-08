import path from "path";
import { app, BrowserWindow } from "electron";
import { EventEmitter } from "events";
import { logger } from "system";
import config from "./config.json";
const { MWindow, MApplication } = process.binding("capture");
app.commandLine.appendSwitch("--disable-background-timer-throttling");

class MRendererWindow extends BrowserWindow {
    constructor(file, width = 800, height = 600) {
        super({ width: width, height: height, webPreferences: { devTools: true }, frame: false });
        this._name = path.basename(file, ".html");
        this._file = path.resolve(__dirname, `../renderer/pages/${file}`);
    }

    get name() {
        return this._name;
    }

    open() {
        this.loadFile(this._file);
    }

    //提供渲染进程进行win.remoteExtend是同步至主进程使用
    remoteExtend(definition) {
        function makeAsync(fn) {
            if (typeof fn !== "function") {
                return fn;
            }
            return function (...args) {
                return new Promise((resolve, reject) => {
                    fn(resolve, reject, ...args);
                });
            }
        }

        for (const { key, desc } of definition) {
            if (desc.get) {
                desc.get = makeAsync(desc.get);
            }
            if (desc.value) {
                desc.value = makeAsync(desc.value);
            }
            Object.defineProperty(this, key, desc);
        }
        return this;
    }
};


class MHomeWindow extends MRendererWindow {
    constructor(width, height) {
        super("home.html");
        this.maximize();
        this.openDevTools();
    }
}


class MMouse extends EventEmitter {

    constructor(owner) {
        super();
        this._owner = owner;
    }

    click(x, y) {
        this.emit("before", "click", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseDown", button: "left", x: x, y: y });
        this._owner.webContents.sendInputEvent({ type: "mouseUp", button: "left", x: x, y: y });
        this.emit("after", "click", x, y);
    }

    doubleClick(x, y) {
        this.emit("before", "doubleClick", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseDown", button: "left", x: x, y: y });
        this._owner.webContents.sendInputEvent({ type: "mouseUp", button: "left", x: x, y: y });
        this._owner.webContents.sendInputEvent({ type: "mouseDown", button: "left", x: x, y: y });
        this._owner.webContents.sendInputEvent({ type: "mouseUp", button: "left", x: x, y: y });
        this.emit("after", "doubleClick", x, y);
    }

    rightClick(x, y) {
        this.emit("before", "rightClick", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseDown", button: "right", x: x, y: y });
        this._owner.webContents.sendInputEvent({ type: "mouseUp", button: "right", x: x, y: y });
        this.emit("after", "rightClick", x, y);
    }

    middleClick(x, y) {
        this.emit("before", "middleClick", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseDown", button: "middle", x: x, y: y });
        this._owner.webContents.sendInputEvent({ type: "mouseUp", button: "middle", x: x, y: y });
        this.emit("after", "middleClick", x, y);
    }

    down(x, y) {
        this.emit("before", "down", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseDown", button: "left", x: x, y: y });
        this.emit("after", "down", x, y);
    }

    up(x, y) {
        this.emit("before", "up", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseUp", button: "left", x: x, y: y });
        this.emit("after", "up", x, y);
    }

    move(x, y) {
        this.emit("before", "move", x, y);
        this._owner.webContents.sendInputEvent({ type: "mouseMove", x: x, y: y });
        this.emit("after", "move", x, y);
    }

    wheel(x, y, count) {
        this.emit("before", "wheel", x, y, count);
        this._owner.webContents.sendInputEvent({ type: "mouseWheel", x: x, y: y, wheelTicksY: count });
        this.emit("after", "wheel", x, y, count);
    }

}

class MKeyboard extends EventEmitter {

    constructor(owner) {
        super();
        this._owner = owner;
    }

    get options() {
        return {
            keys: {
                0: "0",
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                plus: "Plus",
                space: "Space",
                tab: "Tab",
                backspace: "Backspace"
            }
        }
    }

    press(key, combo) {
        this.emit("before", "press", key, combo);
        if (combo) {
            this._owner.webContents.sendInputEvent({ type: "keyDown", keyCode: combo });
        }
        this._owner.webContents.sendInputEvent({ type: "keyDown", keyCode: key });
        this._owner.webContents.sendInputEvent({ type: "keyUp", keyCode: key });
        if (combo) {
            this._owner.webContents.sendInputEvent({ type: "keyUp", keyCode: combo });
        }
        this.emit("after", "press", key, combo);
    }

    down(key, combo = 0) {
        this.emit("before", "down", key, combo);
        if (combo) {
            this._owner.webContents.sendInputEvent({ type: "keyDown", keyCode: combo });
        }
        this._owner.webContents.sendInputEvent({ type: "keyDown", keyCode: key });
        this.emit("after", "down", key, combo);
        return result;
    }

    up(key, combo = 0) {
        this.emit("before", "up", key, combo);
        if (combo) {
            this._owner.webContents.sendInputEvent({ type: "keyUp", keyCode: combo });
        }
        this._owner.webContents.sendInputEvent({ type: "keyUp", keyCode: key });
        this.emit("after", "up", key, combo);
        return result;
    }

    //仅支持英文
    input(text) {
        this.emit("before", "input", text);
        text = text.replace(/\r\n/g, "\n");
        for (let i = 0; i < text.length; i++) {
            let key = text[i];
            if (key === " ") {
                key = "Space";
            }
            if (key === "\r" || key === "\n") {
                key = "Return";
            }
            this._owner.webContents.sendInputEvent({ type: "char", keyCode: key });
        }
        this.emit("after", "input", text);
        return result;
    }

}

class MBrowserWindow extends MRendererWindow {
    constructor(width, height) {
        super("browser.html");
        this.maximize();

        const referrers = {};

        //记录tab的Referer
        this.webContents.on("new-window", (event, url, frameName, disposition,
            options, additionalFeatures, referrer) => {
            event.preventDefault();
            if (url != "about:blank") {
                this.addPage(url).then(framePath => referrers[framePath] = referrer);
            }
        });

        this.webContents.on("did-frame-finish-load", (event, isMainFrame, frameProcessId, frameRoutingId, framePath) => {
            this.extendFrame(framePath);
        });

        const webRequest = this.webContents.session.webRequest;

        //解决头文件来源问题
        webRequest.onBeforeSendHeaders({ urls: ["https://*", "*://*"] }, (details, callback) => {
            if (!details.requestHeaders.Referer && details.framePath && referrers[details.framePath]) {
                details.requestHeaders.Referer = referrers[details.framePath];
            }
            details.requestHeaders["User-Agent"] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36";
            callback({ cancel: false, requestHeaders: details.requestHeaders });
        });

        //解决跨域问题
        webRequest.onHeadersReceived({ urls: ["https://*", "*://*"] }, (details, callback) => {
            delete details.responseHeaders["x-frame-options"];
            delete details.responseHeaders["X-Frame-Options"];
            delete details.responseHeaders["X-Content-Security-Policy"];
            delete details.responseHeaders["Content-Security-Policy"];
            callback({ cancel: false, responseHeaders: details.responseHeaders });
        });

    }

    get mouse() {
        if (!this._mouse) {
            this._mouse = new MMouse(this);
        }
        return this._mouse;
    }

    get keyboard() {
        if (!this._keyboard) {
            this._keyboard = new MKeyboard(this);
        }
        return this._keyboard;
    }

    snapshot(rect) {
        return new Promise((resolve, reject) => {
            try {
                this.capturePage(rect, image => {
                    resolve(image.toDataURL());
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
}


class MMasksWindow extends MRendererWindow {
    constructor(width, height) {
        super("masks.html");
        this.maximize();
    }

    get tracker() {
        if (!this._tracker) {
            let trackMode;
            const win = this;
            this._tracker = {
                get mode() {
                    return trackMode;
                },
                set mode(value) {
                    trackMode = value;
                },
                async fromPoint(x, y) {
                    if (trackMode === "native") {
                        if (!this._nativeWindow) {
                            const handle = win.getNativeWindowHandle().readInt32LE(0);
                            this._nativeWindow = MWindow.fromHandle(handle);
                            this._nativeWindow.bind();
                        }
                        this._nativeWindow.hitTransparent = true;
                        const item = MAutomationFinder.instance.fromPoint(x, y);
                        this._nativeWindow.hitTransparent = false;
                        return { path: item.path, border: item.border };
                    } else if (trackMode === "browser") {
                        if (!app.browserWindow) {
                            throw new Error(`尚未打开浏览器`);
                        }
                        return await app.browserWindow.fromPoint(x, y);
                    } else {
                        throw new Error(`未知的跟踪模式${trackMode}`);
                    }
                }
            };
        }
        return this._tracker;
    }
}


class MPadWindow extends MRendererWindow {
    constructor(width, height) {
        super("pad.html");
    }
}


class MRuntimeWindow extends MRendererWindow {
    constructor(width, height) {
        super("runtime.html");
    }
}

(function () {

    function extend(obj, definition) {
        for (const key of Object.getOwnPropertyNames(definition)) {
            const desc = Object.getOwnPropertyDescriptor(definition, key);
            Object.defineProperty(obj, key, desc);
        }
        return obj;
    }

    const watcher = {
        get interval() {
            return config.watcher.interval;
        },
        get enable() {
            return this._timer;
        },
        set enable(value) {
            if (value && !this._timer) {
                this._active = {};
                this._timer = setInterval(() => {
                    const tickCount = (new Date()).getTime();
                    for (let win of app.rendererWindows) {
                        if (tickCount - this._active[win.name] > this.interval) {
                            this.resume(win);
                        }
                    }
                }, this.interval);
            } else {
                this._active = null;
                clearInterval(this._timer);
                this._timer = null;
            }
        },
        alive(name) {
            if (this._active) {
                this._active[name] = (new Date()).getTime();
            }
        },
        resume(win) {
            win.close();
        }
    };

    extend(app, {

        run() {
            this._env = { argv: process.argv };
            this.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
                event.preventDefault();
                callback(true);
            });
            this.once("window-all-closed", () => {
                this.quit();
            });
            this.once("ready", () => {
                let key, construct;
                if (this._env.argv.length > 2 && this._env.argv[2] === "run") {
                    key = "_runtimeWindow";
                    construct = MRuntimeWindow;
                } else {
                    key = "_homeWindow";
                    construct = MHomeWindow;
                }
                this[key] = new construct();
                this[key].once("close", () => {
                    for (const win of this.rendererWindows) {
                        if (win !== this[key]) {
                            win.terminal();
                        }
                    }
                    this[key] = undefined;
                });
                this[key].open();
            });
        },

        get rpcTimeout() {
            return config.rpc.timeout;
        },

        get rpcPort() {
            return config.rpc.port;
        },

        get logger() {
            return logger;
        },

        get workDirectory() {
            return path.dirname(process.execPath);
        },

        get env() {
            return this._env;
        },

        setEnv(key, value) {
            this._env[key] = value;
        },

        getEnv(key) {
            return this._env[key];
        },

        get external() {
            if (!this._external) {
                this._external = {};
            }
            return this._external;
        },

        open(file, width, height) {
            const list = {
                home: MHomeWindow,
                browser: MBrowserWindow,
                masks: MMasksWindow,
                pad: MPadWindow,
                runtime: MRuntimeWindow
            };
            if (list[file]) {
                const name = `_${file}Window`;
                if (this[name]) {
                    throw new Error(`窗体${file}已创建`);
                }
                this[name] = Reflect.construct(list[file], [width, height]);
                this[name].once("close", () => {
                    this[name] = undefined;
                });
                this[name].open();
                return this[name];
            } else {
                const win = new MRendererWindow(file, width, height);
                return win;
            }
        },

        findWindow(name) {
            return BrowserWindow.getAllWindows().find(win => win.name === name);
        },

        get homeWindow() {
            return this._homeWindow;
        },

        get browserWindow() {
            return this._browserWindow;
        },

        get masksWindow() {
            return this._masksWindow;
        },

        get padWindow() {
            return this._padWindow;
        },

        get runtimeWindow() {
            return this._runtimeWindow;
        },

        get rendererWindows() {
            return BrowserWindow.getAllWindows();
        },

        get focusedWindow() {
            return BrowserWindow.getFocusedWindow();
        },

        get watcher() {
            return watcher;
        }
    });

    app.run();

})();