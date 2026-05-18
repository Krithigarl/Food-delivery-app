import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


const sendEmail = async ({
  to,
  subject,
  text,
}: EmailOptions) => {

  await transporter.sendMail({

    from: process.env.EMAIL,

    to,

    subject,

    text,
  });
};

export default sendEmail;