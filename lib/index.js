"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLogger = void 0;
var dayjs = require("dayjs");
function configureLogger(options) {
    Logger.RemoteLogger = options.remoteLogger;
}
exports.configureLogger = configureLogger;
var Logger = /** @class */ (function () {
    function Logger(context) {
        this.Reset = '\x1b[0m';
        this.Bright = '\x1b[1m';
        this.Dim = '\x1b[2m';
        this.Underscore = '\x1b[4m';
        this.Blink = '\x1b[5m';
        this.Reverse = '\x1b[7m';
        this.Hidden = '\x1b[8m';
        this.FgBlack = '\x1b[30m';
        this.FgRed = '\x1b[31m';
        this.FgGreen = '\x1b[32m';
        this.FgYellow = '\x1b[33m';
        this.FgBlue = '\x1b[34m';
        this.FgMagenta = '\x1b[35m';
        this.FgCyan = '\x1b[36m';
        this.FgWhite = '\x1b[37m';
        this.BgBlack = '\x1b[40m';
        this.BgRed = '\x1b[41m';
        this.BgGreen = '\x1b[42m';
        this.BgYellow = '\x1b[43m';
        this.BgBlue = '\x1b[44m';
        this.BgMagenta = '\x1b[45m';
        this.BgCyan = '\x1b[46m';
        this.BgWhite = '\x1b[47m';
        this._context = context;
    }
    Logger.prototype.logs = function (args, subContext) {
        if (subContext === void 0) { subContext = null; }
        this.log(args, subContext, true);
    };
    Logger.prototype.log = function (args, subContext, stringify) {
        if (subContext === void 0) { subContext = null; }
        if (stringify === void 0) { stringify = false; }
        var date = dayjs().format('HH:mm:ss.SSS ');
        if (Array.isArray(args) || stringify) {
            args = JSON.stringify(args, null, 2);
        }
        var context = "[".concat(this._context, "]");
        if (subContext) {
            context = ("[".concat(this._context, "]:[").concat(subContext, "]"));
        }
        console.log("".concat(this.BgYellow).concat(this.FgBlack, "[").concat(date, "]").concat(context).concat(this.Reset, ": "), args);
        this.logRemote(args, 2, context);
    };
    Logger.prototype.error = function (args, subContext) {
        if (subContext === void 0) { subContext = null; }
        var date = dayjs().format('HH:mm:ss.SSS ');
        if (args instanceof Error) {
            args = args.message;
        }
        args = JSON.stringify(args, null, 2);
        var context = "[".concat(this._context, "]");
        if (subContext) {
            context = ("[".concat(this._context, "]:[").concat(subContext, "]"));
        }
        console.log("".concat(this.BgRed).concat(this.FgBlack, "[").concat(date, "]").concat(context).concat(this.Reset, ": "), args);
        this.logRemote(args, 2, context);
    };
    Logger.prototype.logRemote = function (args, level, context) {
        if (Logger.RemoteLogger) {
            Logger.RemoteLogger(args, level, context);
        }
    };
    Logger.RemoteLogger = null;
    return Logger;
}());
exports.default = Logger;
