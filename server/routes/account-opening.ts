import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

export const handleAccountOpening: RequestHandler = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      motherName,
      idCardNumber,
      bankName,
      accountNumber,
      nominee,
      initialDeposit,
      files,
    } = req.body;

    if (!fullName || !email || !phone || !motherName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const attachments = [];

    if (files?.idCardFront) {
      attachments.push({
        filename: `${fullName}_id_front.jpg`,
        path: files.idCardFront,
      });
    }

    if (files?.idCardBack) {
      attachments.push({
        filename: `${fullName}_id_back.jpg`,
        path: files.idCardBack,
      });
    }

    if (files?.bankStatement) {
      attachments.push({
        filename: `${fullName}_bank_statement.pdf`,
        path: files.bankStatement,
      });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Account Opening Request</h2>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <h3>Personal Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Mother's Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${motherName}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">ID Card Number:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${idCardNumber || "N/A"}</td>
          </tr>
        </table>

        <h3 style="margin-top: 20px;">Bank Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Bank Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bankName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Account Number:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${accountNumber || "N/A"}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Nominee:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${nominee || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Initial Deposit:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">₨${initialDeposit || "5,000"}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated email from PSX Capital Account Opening System.
          Submitted on: ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@psxcapital.com",
      to: "waqarbhlwana@gmail.com",
      cc: email,
      subject: `New Account Opening Request - ${fullName}`,
      html: htmlContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Account opening request submitted successfully",
    });
  } catch (error) {
    console.error("Account opening error:", error);
    return res
      .status(500)
      .json({ error: "Failed to process account opening request" });
  }
};
