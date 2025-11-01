import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("SendEmail skipped: EMAIL_USER/PASS not configured");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text, html });
};
