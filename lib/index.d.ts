export declare type RemoteLoggerType = (args: any, level: string, context: string | null, subContext: string | null) => void;
export interface LoggerOptions {
    remoteLogger: RemoteLoggerType;
}
export declare function configureLogger(options: LoggerOptions): void;
declare enum ForeColor {
    Black = "\u001B[30m",
    Red = "\u001B[31m",
    Green = "\u001B[32m",
    Yellow = "\u001B[33m",
    Blue = "\u001B[34m",
    Magenta = "\u001B[35m",
    Cyan = "\u001B[36m",
    White = "\u001B[37m"
}
declare enum BgColor {
    Black = "\u001B[40m",
    Red = "\u001B[41m",
    Green = "\u001B[42m",
    Yellow = "\u001B[43m",
    Blue = "\u001B[44m",
    Magenta = "\u001B[45m",
    Cyan = "\u001B[46m",
    White = "\u001B[47m"
}
export default class Logger {
    private bgColor;
    private foreColor;
    static RemoteLogger: RemoteLoggerType | null;
    _context: string;
    private Reset;
    constructor(context: string, bgColor?: BgColor, foreColor?: ForeColor);
    /**
     * @deprecated The method should not be used. Use log() instead
     */
    logs(args: any, subContext?: string | null): void;
    log(args: any, subContext?: string | null): void;
    error(args: any, subContext?: string | null): void;
    private logRemote;
}
export {};
