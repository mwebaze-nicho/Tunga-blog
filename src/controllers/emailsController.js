const { transporter } = require("@/config/emailConfig");

exports.sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: "Tech 🧑🏽‍💻 Blog", // sender address
      to: "mwebazenicholas6@gmail.com",
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<h2>Hello world?</h2> \n <p>Testing nodemailer app. Learn more by clicking <a href='https://mwebaze.vercel.app'>here</a></p> \n <img src='https://asset.cloudinary.com/dexwmv2n8/7a2d7af5312b0153cc9a8725757b2803'/>", // html body
    });

    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
};
