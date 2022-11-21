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

async function orderMail(tomail, orders) {
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: tomail,
    subject: "Email from Pattiams.com",
    // text: `Hi, Your order has submitted.`,
    html: `<p>Hi, Your order has submitted.</p>
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

async function mailToAdmin(orders) {
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

// Welcome mail
async function welcomeMail(tomail, name) {
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: tomail,
    subject: "Email from Pattiams.com",
    html: `<h2>Hi ${name},</h2>
      <p>Welcome to Pattiams</p>
      <p>We are glad to see you here. 
      Explore a wide variety of quality products from a huge collection. Know about our latest products, exclusive offers, and much more...</p>
      <p><a href="https://pattiams.com">Pattiams.com</a></p>
      <p>Thank you.</p>`,
  });
}

// Shipping mail
async function shippingMail(tomail, name, tracking, service) {
  const result = await transporter.sendMail({
    from: "pattiams2022@gmail.com",
    to: tomail,
    subject: "Email from Pattiams.com",
    html: `<h2>Hi ${name},</h2>
      <p>We are glad to inform you that your order has shipped.</p>
      <p>Shipping service: ${service}</p>
      <p>Tracking number: ${tracking}</p>
      <p><a href="https://pattiams.com">Pattiams.com</a></p>
      <p>Thank you.</p>`,
  });
}

export { mail, orderMail, mailToAdmin, welcomeMail, shippingMail };
