import nodemailer from "nodemailer";

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function notifyAdminNewUser({
  organizationName,
  userName,
  workEmail,
  country,
}) {
  const transporter = createTransporter();

  const adminEmail = process.env.ADMIN_EMAIL;
  const senderEmail = process.env.SMTP_USER;
  if (!adminEmail) throw new Error("ADMIN_EMAIL not configured");

  // admin message
  await transporter.sendMail({
    from: `"Invite App" <${senderEmail}>`,
    to: adminEmail,
    subject: `New user invited: ${userName} (${workEmail})`,
    text:
      `A new user has been created.\n\n` +
      `Organization: ${organizationName}\n` +
      `Name: ${userName}\n` +
      `Email: ${workEmail}\n` +
      `Country: ${country}\n`,
  });

  // new user message
  await transporter.sendMail({
    from: `"Invite App" <${senderEmail}>`,
    to: workEmail,
    subject: `Signup Notification: Invite App`,
    text:
      `Congratulations! Your account has been created successfully.\n\n` +
      `Organization: ${organizationName}\n` +
      `Name: ${userName}\n` +
      `Email: ${workEmail}\n` +
      `Country: ${country}\n`,
  });
}
