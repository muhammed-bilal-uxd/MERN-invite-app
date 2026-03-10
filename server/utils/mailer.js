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
    subject: `New User Registered`,
    html: `
    <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:40px">
      <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:8px">
  
        <h2 style="margin-top:0;color:#222">New User Registration</h2>
        <p>A new user has joined the platform.</p>
  
        <table style="width:100%;border-collapse:collapse;margin-top:20px">
          <tr>
            <td style="padding:8px;font-weight:bold">Organization</td>
            <td style="padding:8px">${organizationName}</td>
          </tr>
          <tr>
            <td style="padding:8px;font-weight:bold">Name</td>
            <td style="padding:8px">${userName}</td>
          </tr>
          <tr>
            <td style="padding:8px;font-weight:bold">Email</td>
            <td style="padding:8px">${workEmail}</td>
          </tr>
          <tr>
            <td style="padding:8px;font-weight:bold">Country</td>
            <td style="padding:8px">${country}</td>
          </tr>
        </table>
  
        <p style="margin-top:30px;font-size:14px;color:#666">
        Invite App System Notification
        </p>
  
      </div>
    </div>
    `
  });

  // new user message
  await transporter.sendMail({
    from: `"Invite App" <${senderEmail}>`,
    to: workEmail,
    subject: `Welcome to Invite App 🎉`,
    html: `
    <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:40px">
      <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:8px">
  
        <h2 style="margin-top:0;color:#222">Welcome to Invite App 🎉</h2>
  
        <p>Hello <strong>${userName}</strong>,</p>
  
        <p>Your account has been successfully created. We're excited to have you onboard.</p>
  
        <div style="background:#f2f4f8;padding:15px;border-radius:6px;margin-top:20px">
          <p style="margin:5px"><strong>Organization:</strong> ${organizationName}</p>
          <p style="margin:5px"><strong>Email:</strong> ${workEmail}</p>
          <p style="margin:5px"><strong>Country:</strong> ${country}</p>
        </div>
  
        <p style="margin-top:25px">
          You can now start using Invite App to manage your invitations and collaboration.
        </p>
  
        <div style="margin-top:30px">
          <a href="#" 
          style="background:#4f46e5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px">
          Go to Dashboard
          </a>
        </div>
  
        <p style="margin-top:30px;font-size:13px;color:#777">
        If you need help, feel free to contact our support team.
        </p>
  
        <p style="font-size:14px;margin-top:20px">
        Regards,<br>
        <strong>Invite App Team</strong>
        </p>
  
      </div>
    </div>
    `
  });
}
