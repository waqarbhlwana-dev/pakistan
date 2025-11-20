import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

export const handlePortfolioManagement: RequestHandler = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      portfolioValue,
      riskLevel,
      strategy,
      targetReturn,
      notes,
      commissionRate,
      commissionAmount,
      portfolioAmount,
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedPortfolio = Number(portfolioAmount ?? portfolioValue ?? 0) || 0;
    const rate = Number(commissionRate ?? 0.1);
    const computedCommission = Math.round(
      Number.isFinite(Number(commissionAmount))
        ? Number(commissionAmount)
        : parsedPortfolio * rate,
    );

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color:#111">New Portfolio Management Request</h2>
        <p style="color:#444">A new request has been submitted with the details below.</p>
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background:#f7f7f7">
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Full Name</td>
            <td style="padding:8px; border:1px solid #ddd">${fullName}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Email</td>
            <td style="padding:8px; border:1px solid #ddd">${email}</td>
          </tr>
          <tr style="background:#f7f7f7">
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Phone</td>
            <td style="padding:8px; border:1px solid #ddd">${phone}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Portfolio Amount (₨)</td>
            <td style="padding:8px; border:1px solid #ddd">${parsedPortfolio.toLocaleString()}</td>
          </tr>
          <tr style="background:#f7f7f7">
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Risk Level</td>
            <td style="padding:8px; border:1px solid #ddd">${riskLevel || "medium"}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Strategy</td>
            <td style="padding:8px; border:1px solid #ddd">${strategy || "balanced"}</td>
          </tr>
          <tr style="background:#f7f7f7">
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Target Return (%)</td>
            <td style="padding:8px; border:1px solid #ddd">${targetReturn || "-"}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Management Commission</td>
            <td style="padding:8px; border:1px solid #ddd">10% (Fixed)</td>
          </tr>
          <tr style="background:#f7f7f7">
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Estimated Commission (₨)</td>
            <td style="padding:8px; border:1px solid #ddd">${computedCommission.toLocaleString()}</td>
          </tr>
        </table>
        ${notes ? `<h3 style="margin-top:16px;">Notes</h3><p style="white-space:pre-wrap;">${notes}</p>` : ""}
        <hr style="border:none; border-top:1px solid #eee; margin:16px 0;"/>
        <p style="color:#666; font-size:12px;">Submitted on: ${new Date().toLocaleString()}</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@psxcapital.com",
      to: "waqarbhlwana@gmail.com",
      cc: email,
      subject: `New Portfolio Management Request - ${fullName}`,
      html,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (err) {
    console.error("Portfolio management submission error:", err);
    return res
      .status(500)
      .json({ error: "Failed to submit portfolio request" });
  }
};
