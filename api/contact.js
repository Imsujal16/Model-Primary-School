import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers just in case
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { from_name, phone, class_interest, message } = req.body;

    if (!from_name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required' });
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Standard configuration for Gmail
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format the email using HTML
    const mailOptions = {
      from: `"Model Primary School" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || 'psbharsare@gmail.com',
      subject: `New Admission Inquiry from ${from_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #7A2331; border-bottom: 2px solid #F0A828; padding-bottom: 10px;">New Website Contact Form Submission</h2>
          <p><strong>Name:</strong> ${from_name}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Class Interested In:</strong> ${class_interest || 'Not Specified'}</p>
          
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #7A2331;">
            <strong>Message:</strong><br/>
            ${message ? message.replace(/\n/g, '<br/>') : '<em>No additional message provided.</em>'}
          </div>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px;">
            This email was automatically generated from the Model Primary School website contact form.
          </p>
        </div>
      `,
      replyTo: process.env.SMTP_USER,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
