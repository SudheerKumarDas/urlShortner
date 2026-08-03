import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailVerification = async (toEmail, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"MY APP" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify email address",
    html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8" />
            <title>Email Verification</title>
          </head>

          <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
              <tr>
                <td align="center">

                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">

                    <!-- Header -->
                    <tr>
                      <td align="center" style="background:#2563eb;padding:30px;">
                        <h1 style="margin:0;color:#ffffff;font-size:28px;">
                          🔗 URL Shortener
                        </h1>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:40px;">

                        <h2 style="margin-top:0;color:#111827;">
                          Verify Your Email Address
                        </h2>

                        <p style="color:#4b5563;font-size:16px;line-height:1.7;">
                          Thank you for registering with
                          <strong>URL Shortener</strong>.
                        </p>

                        <p style="color:#4b5563;font-size:16px;line-height:1.7;">
                          Please verify your email address by clicking the button below.
                        </p>

                        <div style="text-align:center;margin:40px 0;">
                          <a
                            href="${verifyUrl}"
                            target="_blank"
                            style="
                              background:#2563eb;
                              color:#ffffff;
                              text-decoration:none;
                              padding:16px 32px;
                              border-radius:8px;
                              font-size:16px;
                              font-weight:bold;
                              display:inline-block;
                            "
                          >
                            Verify Email
                          </a>
                        </div>

                        <p style="color:#6b7280;font-size:15px;">
                          ⏰ This verification link will expire in
                          <strong>1 hour</strong>.
                        </p>

                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

                        <p style="color:#6b7280;font-size:14px;">
                          If the button doesn't work, copy and paste this URL into your browser:
                        </p>

                        <p
                          style="
                            background:#f9fafb;
                            padding:14px;
                            border-radius:6px;
                            word-break:break-all;
                            font-size:13px;
                            color:#2563eb;
                          "
                        >
                          ${verifyUrl}
                        </p>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td
                        align="center"
                        style="background:#f9fafb;padding:25px;color:#6b7280;font-size:13px;"
                      >
                        This email was sent by
                        <strong>URL Shortener</strong>.

                        <br><br>

                        If you didn't create an account, you can safely ignore this email.
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>

          </body>
          </html>
          `,
  });
};

export default emailVerification;
