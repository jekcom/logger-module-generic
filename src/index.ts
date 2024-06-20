import dayjs = require("dayjs");
export type RemoteLoggerType = (
  args: any,
  level: string,
  context: string | null,
  subContext: string | null
) => void;
export interface LoggerOptions {
  remoteLogger: RemoteLoggerType;
}
export function configureLogger(options: LoggerOptions) {
  Logger.RemoteLogger = options.remoteLogger;
}

export enum ForeColor {
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m",
}

export enum BgColor {
  Black = "\x1b[40m",
  Red = "\x1b[41m",
  Green = "\x1b[42m",
  Yellow = "\x1b[43m",
  Blue = "\x1b[44m",
  Magenta = "\x1b[45m",
  Cyan = "\x1b[46m",
  White = "\x1b[47m",
}
export default class Logger {
  static RemoteLogger: RemoteLoggerType | null = null;

  _context: string;

  private Reset = "\x1b[0m";
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

  constructor(context: string, private bgColor : BgColor = BgColor.Yellow, private foreColor : ForeColor = ForeColor.Black ) {
    this._context = context;
  }

  /**
   * @deprecated The method should not be used. Use log() instead
   */
  logs(args: any, subContext: string | null = null) {
    this.log(args, subContext);
  }

  log(args: any, subContext: string | null = null) {
    let date = dayjs().format("HH:mm:ss.SSS ");

    // Stringify if passed object is not string
    if (!(typeof args === "string" || args instanceof String)) {
      args = JSON.stringify(args, null, 2);
    }

    let context = `[${this._context}]`;
    if (subContext) {
      context = `[${this._context}]:[${subContext}]`;
    }

    console.log(
      `${this.bgColor}${this.foreColor}[${date}]${context}${this.Reset}: `,
      args
    );

    this.logRemote(args, "INFO", this._context, subContext);
  }

  error(args: any, subContext: string | null = null) {
    let date = dayjs().format("HH:mm:ss.SSS ");

    if (args instanceof Error) {
      args = args.message;
    }

    args = JSON.stringify(args, null, 2);

    let context = `[${this._context}]`;
    if (subContext) {
      context = `[${this._context}]:[${subContext}]`;
    }
    console.log(
      `${BgColor.Red}${ForeColor.White}[${date}]${context}${this.Reset}: `,
      args
    );

    this.logRemote(args, "ERROR", this._context, subContext);
  }

  private logRemote(
    args: any,
    level: string,
    context: string | null,
    subContext: string | null
  ) {
    if (Logger.RemoteLogger) {
      Logger.RemoteLogger(args, level, context, subContext);
    }
  }
}
