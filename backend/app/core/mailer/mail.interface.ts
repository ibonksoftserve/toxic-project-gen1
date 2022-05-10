import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// ------ Common types ------ //

export type TransportResponse = Promise<Transporter<SMTPTransport.SentMessageInfo>>;
export type EmailResponse = Promise<SMTPTransport.SentMessageInfo>;

export enum Templates {
  plain = 'plain_text',
  confirmAccount = 'confirm_account'
}

export const templateSubjects: Map<string, string> = new Map([
  [ Templates.plain, '' ],
  [ Templates.confirmAccount, 'Confirm account email'],
]);

// ------- Mail Client types ------ //

export interface ITransportConfig {
  host: string;
  port: number;
  senderEmail: string;
}

export interface IMailInputData {
  from?: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

// ------- Email templates input data types ------- //

export interface IPlainEmailData {
  message: string;
}

export interface IConfirmAccountEmailData {
  link: string;
}

export type EmailData = IPlainEmailData | IConfirmAccountEmailData;
