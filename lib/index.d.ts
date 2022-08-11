export declare type RemoteLoggerType = (args: any, level: number, context: (string | null)) => void;
export interface LoggerOptions {
    deviceData: string;
    remoteLogger: RemoteLoggerType;
}
export declare function configureLogger(options: LoggerOptions): void;
export default class Logger {
    static DeviceData: string;
    static RemoteLogger: RemoteLoggerType | null;
    _context: string;
    Reset: string;
    Bright: string;
    Dim: string;
    Underscore: string;
    Blink: string;
    Reverse: string;
    Hidden: string;
    FgBlack: string;
    FgRed: string;
    FgGreen: string;
    FgYellow: string;
    FgBlue: string;
    FgMagenta: string;
    FgCyan: string;
    FgWhite: string;
    BgBlack: string;
    BgRed: string;
    BgGreen: string;
    BgYellow: string;
    BgBlue: string;
    BgMagenta: string;
    BgCyan: string;
    BgWhite: string;
    constructor(context: string);
    logs(args: any, subContext?: (string | null)): void;
    log(args: any, subContext?: (string | null), stringify?: boolean): void;
    error(args: any, subContext?: (string | null)): void;
    private logRemote;
}
