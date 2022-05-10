export interface IConfigs {
  port: number;
  databaseURL: string;
  apiPrefix: string;
  env: string;
  logDir: string;
  nodemailer: {
    host: string;
    port: number;
    senderEmail: string;
  };
}
