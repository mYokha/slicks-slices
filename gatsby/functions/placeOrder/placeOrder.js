const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>
        Your recent order for ${total}
      </h2>
      <p>
        Please start walking over, we well have your order ready in the next 20 minutes.
      </p>
      <ul>
        ${order
          .map(
            (item) =>
              `
                <li>
                  <img src="${item.thumbnail}" alt="${item.name}" />
                  ${item.size} ${item.name} - ${item.price}
                </li>
             `
          )
          .join('')}
      </ul>
      <p>
        Your total is: <strong>${total}</strong> грн due to pickup
      </p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>
  `;
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (body.mapleSyrup)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: '🕢 👟 🏵 🎬 🐂 📧 👳 ♌️ ☝️ 🍟' }),
    };

  const requestFields = ['email', 'name', 'order'];

  for (const field of requestFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field.`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' }),
  };
};
