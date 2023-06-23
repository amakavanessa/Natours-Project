const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Precious Vanny <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: 'premium108.web-hosting.com',
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_PROD_USERNAME,
          pass: process.env.EMAIL_PROD_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  //send the actual email
  async send(template, subject) {
    // 1) Render the html for the email based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    //Define the email options
    const mailOptions = {
      from: process.env.EMAIL_PROD_USERNAME,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.fromString(html),
    };

    //3)Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the TourX Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password rest token(valid for only 10 minutes)'
    );
  }
};
