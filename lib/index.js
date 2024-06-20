"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLogger = void 0;
var dayjs = require("dayjs");
function configureLogger(options) {
    Logger.RemoteLogger = options.remoteLogger;
}
exports.configureLogger = configureLogger;
var ForeColor;
(function (ForeColor) {
    ForeColor["Black"] = "\u001B[30m";
    ForeColor["Red"] = "\u001B[31m";
    ForeColor["Green"] = "\u001B[32m";
    ForeColor["Yellow"] = "\u001B[33m";
    ForeColor["Blue"] = "\u001B[34m";
    ForeColor["Magenta"] = "\u001B[35m";
    ForeColor["Cyan"] = "\u001B[36m";
    ForeColor["White"] = "\u001B[37m";
})(ForeColor || (ForeColor = {}));
var BgColor;
(function (BgColor) {
    BgColor["Black"] = "\u001B[40m";
    BgColor["Red"] = "\u001B[41m";
    BgColor["Green"] = "\u001B[42m";
    BgColor["Yellow"] = "\u001B[43m";
    BgColor["Blue"] = "\u001B[44m";
    BgColor["Magenta"] = "\u001B[45m";
    BgColor["Cyan"] = "\u001B[46m";
    BgColor["White"] = "\u001B[47m";
})(BgColor || (BgColor = {}));
var Logger = /** @class */ (function () {
    //   Bright = "\x1b[1m";
    //   Dim = "\x1b[2m";
    //   Underscore = "\x1b[4m";
    //   Blink = "\x1b[5m";
    //   Reverse = "\x1b[7m";
    //   Hidden = "\x1b[8m";
    //   FgBlack = "\x1b[30m";
    //   FgRed = "\x1b[31m";
    //   FgGreen = "\x1b[32m";
    //   FgYellow = "\x1b[33m";
    //   FgBlue = "\x1b[34m";
    //   FgMagenta = "\x1b[35m";
    //   FgCyan = "\x1b[36m";
    //   FgWhite = "\x1b[37m";
    //   BgBlack = "\x1b[40m";
    //   BgRed = "\x1b[41m";
    //   BgGreen = "\x1b[42m";
    //   BgYellow = "\x1b[43m";
    //   BgBlue = "\x1b[44m";
    //   BgMagenta = "\x1b[45m";
    //   BgCyan = "\x1b[46m";
    //   BgWhite = "\x1b[47m";
    function Logger(context, bgColor, foreColor) {
        if (bgColor === void 0) { bgColor = BgColor.Yellow; }
        if (foreColor === void 0) { foreColor = ForeColor.Black; }
        this.bgColor = bgColor;
        this.foreColor = foreColor;
        this.Reset = "\x1b[0m";
        this._context = context;
    }
    /**
     * @deprecated The method should not be used. Use log() instead
     */
    Logger.prototype.logs = function (args, subContext) {
        if (subContext === void 0) { subContext = null; }
        this.log(args, subContext);
    };
    Logger.prototype.log = function (args, subContext) {
        if (subContext === void 0) { subContext = null; }
        var date = dayjs().format("HH:mm:ss.SSS ");
        // Stringify if passed object is not string
        if (!(typeof args === "string" || args instanceof String)) {
            args = JSON.stringify(args, null, 2);
        }
        var context = "[".concat(this._context, "]");
        if (subContext) {
            context = "[".concat(this._context, "]:[").concat(subContext, "]");
        }
        console.log("".concat(this.bgColor).concat(this.foreColor, "[").concat(date, "]").concat(context).concat(this.Reset, ": "), args);
        this.logRemote(args, "INFO", this._context, subContext);
    };
    Logger.prototype.error = function (args, subContext) {
        if (subContext === void 0) { subContext = null; }
        var date = dayjs().format("HH:mm:ss.SSS ");
        if (args instanceof Error) {
            args = args.message;
        }
        args = JSON.stringify(args, null, 2);
        var context = "[".concat(this._context, "]");
        if (subContext) {
            context = "[".concat(this._context, "]:[").concat(subContext, "]");
        }
        console.log("".concat(BgColor.Red).concat(ForeColor.White, "[").concat(date, "]").concat(context).concat(this.Reset, ": "), args);
        this.logRemote(args, "ERROR", this._context, subContext);
    };
    Logger.prototype.logRemote = function (args, level, context, subContext) {
        if (Logger.RemoteLogger) {
            Logger.RemoteLogger(args, level, context, subContext);
        }
    };
    Logger.RemoteLogger = null;
    return Logger;
}());
exports.default = Logger;
