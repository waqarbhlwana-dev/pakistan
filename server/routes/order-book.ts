import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

export const handleOrderBook: RequestHandler = async (req, res) => {
  try {
    const { fullName, email, phone, address, quantity } = req.body;
    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
        <h2>New Book Order</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr style="background:#f7f7f7"><td style="padding:8px; border:1px solid #ddd; font-weight:bold">Name</td><td style="padding:8px; border:1px solid #ddd">${fullName}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold">Email</td><td style="padding:8px; border:1px solid #ddd">${email}</td></tr>
          <tr style="background:#f7f7f7"><td style="padding:8px; border:1px solid #ddd; font-weight:bold">Phone</td><td style="padding:8px; border:1px solid #ddd">${phone}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold">Address</td><td style="padding:8px; border:1px solid #ddd">${address}</td></tr>
          <tr style="background:#f7f7f7"><td style="padding:8px; border:1px solid #ddd; font-weight:bold">Quantity</td><td style="padding:8px; border:1px solid #ddd">${quantity || 1}</td></tr>
        </table>
        <p style="color:#666; font-size:12px;">Submitted on: ${new Date().toLocaleString()}</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@psxcapital.com",
      to: "waqarbhlwana@gmail.com",
      cc: email,
      subject: `New Book Order - ${fullName}`,
      html,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (err) {
    console.error("Order book submission error:", err);
    return res.status(500).json({ error: "Failed to submit order" });
  }
};
