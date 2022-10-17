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
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: tomail,
    subject: "Email from Pattiams.com",
    text: `Hi, Your order has submitted.`,
  });
}

async function mailToAdmin(orders) {
  console.log(orders);
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: "pattiamsorders@gmail.com",
    subject: "Order submitted from pattiams.com",
    html: `<p>Order submitted from Pattiams website</p>
    <h5>The order details: </h5>
    <p><strong>Address: </strong></p>
    <p>Name: ${orders.shippingAddress.name}</p>
    <p>Phone: ${orders.shippingAddress.phone}</p>
    <p>Flat: ${orders.shippingAddress.flat}</p>
    <p>Area: ${orders.shippingAddress.area}</p>
    <p>City: ${orders.shippingAddress.city}</p>
    <p>Postal code: ${orders.shippingAddress.postalCode}</p>
    <p>State: ${orders.shippingAddress.state}</p>
    <table>
  <tr style="border: 1px solid #dddddd;text-align: left;padding: 8px;">
    <th>Product Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Model</th>
    <th>Total Price</th>
  </tr>
  ${orders.orderItems.map(
    (order) =>
      `<tr>
        <td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${
          order.productName
        }</td>
        <td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${
          order.qty
        }</td>
        <td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${
          order.price
        }</td>
        <td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${
          order.productVariant[0].model
        }</td>
        <td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">${
          order.qty * order.price
        }</td>
      </tr>`
  )}
</table>
<h4>Subtotal: ${orders.totalPrice}</h4>
    `,
  });
}

export { mail, orderMail, mailToAdmin };