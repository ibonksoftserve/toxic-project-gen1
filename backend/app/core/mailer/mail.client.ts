import {
  EmailResponse,
  IMailInputData,
  ITransportConfig,
  TransportResponse,
} from './mail.interface';

import logger from '../logger';
import nodemailer from 'nodemailer';
import { ServerError } from '../api.errors';
import { IConfigs } from '../../config/config.interface';

export interface IMailClientProps {
  configs: IConfigs;
}

export interface IMailClient {
  send: (data: IMailInputData) => EmailResponse;
}

export class MailClient implements IMailClient {
  private transportConfig: ITransportConfig;

  constructor({ configs }: IMailClientProps) {
    this.transportConfig = {
      host: configs.nodemailer.host,
      port: configs.nodemailer.port,
      senderEmail: configs.nodemailer.senderEmail,
    };
  }

  public async send({
    from = this.transportConfig.senderEmail,
    to = '',
    subject = '',
    html = '',
    text = '',
  }: IMailInputData): EmailResponse {
    try {
      const transport = await this.createSMTPTransport();
      const sentMailInfo = await transport.sendMail({ from, to, subject, html, text });

      return sentMailInfo;
    } catch (error) {
      logger.error('Cannot send email');
      throw new ServerError(error);
    }
  }

  private async createSMTPTransport(): TransportResponse {
    try {
      const transports = nodemailer.createTransport(this.transportConfig);
      await transports.verify(); // will throw an error if something went wrong

      logger.info('Mail client is ready to go');
      return transports;
    } catch (error) {
      logger.error('Cannot create SMTP transport');
      throw new ServerError(error);
    }
  }

}