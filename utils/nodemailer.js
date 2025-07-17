const nodemailer = require("nodemailer");

const enviarCorreo = async (email, subject, html) => {
  /*
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "eaf0f6db3528ed",
      pass: "314f40b86a98e5",
    },
  });
  */

  var transport2 = nodemailer.createTransport({
    service: "gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "ic3386941@gmail.com",
      pass: "iucm uxyj mdum lclf",
    },
  });

  try {
    await transport2.sendMail({
      from: "ic3386941@gmail.com",
      to: email,
      subject: subject,
      html: html,
    });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = enviarCorreo;
