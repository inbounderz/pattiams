import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pattiams2022@gmail.com",
    pass: "bhtoizzxzfgtougl",
  },
});

async function mail(tomail, otp) {
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: tomail,
    subject: "Email from Pattiams.com",
    text: `Your password reset OTP is ${otp}`,
  });
}

async function orderMail(tomail, order) {
    console.log(order);
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: tomail,
    subject: "Email from Pattiams.com",
    text: `Hi, Your order has submitted.`,
  });
}

export { mail, orderMail };
