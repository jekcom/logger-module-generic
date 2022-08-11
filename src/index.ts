
import dayjs = require('dayjs');
export type RemoteLoggerType = (args: any, level: number, context: (string | null)) => void;
export interface LoggerOptions {
    deviceData: string;

    remoteLogger: RemoteLoggerType
}
export function configureLogger(options: LoggerOptions) {
    Logger.DeviceData = options.deviceData;
    Logger.RemoteLogger = options.remoteLogger;
}
export default class Logger {
    static DeviceData: string;
    static RemoteLogger: RemoteLoggerType | null = null;

    _context: string;



    Reset = '\x1b[0m';
    Bright = '\x1b[1m';
    Dim = '\x1b[2m';
    Underscore = '\x1b[4m';
    Blink = '\x1b[5m';
    Reverse = '\x1b[7m';
    Hidden = '\x1b[8m';

    FgBlack = '\x1b[30m';
    FgRed = '\x1b[31m';
    FgGreen = '\x1b[32m';
    FgYellow = '\x1b[33m';
    FgBlue = '\x1b[34m';
    FgMagenta = '\x1b[35m';
    FgCyan = '\x1b[36m';
    FgWhite = '\x1b[37m';

    BgBlack = '\x1b[40m';
    BgRed = '\x1b[41m';
    BgGreen = '\x1b[42m';
    BgYellow = '\x1b[43m';
    BgBlue = '\x1b[44m';
    BgMagenta = '\x1b[45m';
    BgCyan = '\x1b[46m';
    BgWhite = '\x1b[47m';


    constructor(context: string) {
        this._context = context;
    }

    logs(args: any, subContext: (string | null) = null) {
        this.log(args, subContext, true);
    }
    log(args: any, subContext: (string | null) = null, stringify = false) {

        let date = dayjs().format('HH:mm:ss.SSS ');
        if (Array.isArray(args) || stringify) {
            args = JSON.stringify(args, null, 2);
        }
        let context = `[${this._context}]`;
        if (subContext) {
            context = (`[${this._context}]:[${subContext}]`);

        }

        console.log(`${this.BgYellow}${this.FgBlack}[${date}]${context}${this.Reset}: `, args);

        this.logRemote(args, 2, context);
    }

    error(args: any, subContext: (string | null) = null) {

        let date = dayjs().format('HH:mm:ss.SSS ');

        if (args instanceof Error) {
            args = args.message;
        }

        args = JSON.stringify(args, null, 2);


        let context = `[${this._context}]`;
        if (subContext) {
            context = (`[${this._context}]:[${subContext}]`);

        }
        console.log(`${this.BgRed}${this.FgBlack}[${date}]${context}${this.Reset}: `, args);

        this.logRemote(args, 2, context);
    }



    private logRemote(args: any, level: number, context: (string | null)) {
        if (Logger.RemoteLogger) {
            Logger.RemoteLogger(args, level, context)
        }


    }

}