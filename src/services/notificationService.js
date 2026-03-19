const nodemailer = require("nodemailer");

// 📧 Nodemailer Configuration
// Gmail use korle 'App Password' lagbe (Normal login password e hobe na)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "niloy2931@gmail.com", // Apnar email
    pass: "your-app-password",    // Google Account theke banano 16 digit app password
  },
});

// --- ১. User-er kache Confirmation Email ---
exports.sendUserConfirmationEmail = async (userEmail, orderDetails) => {
  const mailOptions = {
    from: '"Japan Halal Food" <your-email@gmail.com>',
    to: userEmail,
    subject: "Order Placed Successfully! ✅",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #27ae60;">Assalamu Alaikum!</h2>
        <p>Thank you for your order at <strong>Japan Halal Food</strong>.</p>
        <p><strong>Order ID:</strong> ${orderDetails._id}</p>
        <p><strong>Total Amount:</strong> ${orderDetails.totalPrice} JPY</p>
        <p>We are currently processing your order. You will be notified once it is confirmed.</p>
        <br/>
        <p>Best Regards,<br/>Japan Halal Food Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to User.");
  } catch (err) {
    console.error("User Email Error:", err.message);
  }
};

// --- ২. Admin-er kache Notified Email ---
exports.sendAdminNotificationEmail = async (orderDetails) => {
  const adminEmail = "anisul2917@gmail.com"; // ⚡ Ekhane apnar admin mail den
  
  const itemsList = orderDetails.orderItems
    .map(item => `<li>${item.name} - Qty: ${item.qty} - Price: ${item.price} JPY</li>`)
    .join("");

  const mailOptions = {
    from: '"Japan Halal Food Server" <your-email@gmail.com>',
    to: adminEmail,
    subject: "🚀 New Order Received!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <h2 style="background: #2c3e50; color: #fff; padding: 10px;">New Order Alert!</h2>
        <p><strong>Order ID:</strong> ${orderDetails._id}</p>
        <p><strong>Customer Phone:</strong> ${orderDetails.shippingAddress.phone}</p>
        <p><strong>Address:</strong> ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}</p>
        <hr/>
        <h4>Order Items:</h4>
        <ul>${itemsList}</ul>
        <h3>Total: ${orderDetails.totalPrice} JPY</h3>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to Admin.");
  } catch (err) {
    console.error("Admin Email Error:", err.message);
  }
};