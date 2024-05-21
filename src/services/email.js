
const { transporter } = require("@/config/emailConfig");

export async function sendEmail(email, token, baseUrl) {
  try {
    const emailInfo = await transporter.sendMail({
      from: `"Tech 🧑🏽‍💻 Blog" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
      <h2>Reset your account password</h2>
      <p>You are receiving this email from <a href="http://${baseUrl}">Tech 🧑🏽‍💻 Blog</a> because you requested to change your password. Follow the link to reset your password.</p>
      <p>Click <a href="http://${baseUrl}/users/resetpassword?token=${token}" target="_blank">Reset Password</a> to reset your password or ignore this email if it was sent in error. This link is valid for 1 hour from the time of this email.</p>
    `,
    });
    return emailInfo;
  } catch (error) {
    console.log(error);
  }
}
