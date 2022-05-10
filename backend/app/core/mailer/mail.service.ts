import {
  EmailData,
  EmailResponse,
  IConfirmAccountEmailData,
  IPlainEmailData,
  Templates,
  templateSubjects,
} from './mail.interface';

import Email from 'email-templates';
import { IMailClient } from './mail.client';
import path from 'path';

export interface IMailServiceProps {
  MailClient: IMailClient
}

export interface IMailService {
  sendPlainEmail: (email: string, data: IPlainEmailData) => EmailResponse;
  sendConfirmAccountEmail: (email: string, data: IConfirmAccountEmailData) => EmailResponse;
}

export class MailService implements IMailService {
  private MailClient: IMailClient;

  constructor({ MailClient }: IMailServiceProps) {
    this.MailClient = MailClient;
  }

  public async sendPlainEmail(email: string, data: IPlainEmailData): EmailResponse {
    return this.sendEmail(Templates.plain, email, data);
  }

  public async sendConfirmAccountEmail(email: string, data: IConfirmAccountEmailData): EmailResponse {
    return this.sendEmail(Templates.confirmAccount, email, data);
  }

  private async sendEmail(template: Templates, email: string, data: EmailData): EmailResponse {
    const subject = templateSubjects.get(template) || '';
    const [resultTxt, resultHtml] = await this.generateTemplate(template, data);

    return this.MailClient.send({
      to: email,
      subject,
      html: resultHtml,
      text: resultTxt,
    });
  }

  private async generateTemplate(template: Templates, data: EmailData): Promise<[string, string]> {
    const templatesDir = path.join(__dirname, '/templates');
    const newsletter = new Email({ views: { options: { extension: 'ejs' }, root: path.join(templatesDir) } });

    return Promise.all([
      newsletter.render(template + '/text', data),
      newsletter.render(template + '/html', data),
    ]);
  }

}
