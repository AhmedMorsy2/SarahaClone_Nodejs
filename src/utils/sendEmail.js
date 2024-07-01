import nodemailer from "nodemailer";
export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedaboalgoud2@gmail.com",
      pass: "sjhazidjnntrjwzn",
    },
  });

  const info = await transporter.sendMail({
    from: '"Verification" <ahmedaboalgoud2@gmail.com>',
    to: email,
    subject: "Verification Code",
    html: `Your Verification Code ${otp}`,
  });
  // console.log({ message: "Sucess", info });
};
