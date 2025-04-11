const { sendEmail } = require('../config/email');

// @desc    Send contact form/enquiry email
// @route   POST /api/email/contact
// @access  Public
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and message',
      });
    }

    // Create email content
    const emailContent = `
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subject || 'General Enquiry'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Contact Form: ${subject || 'General Enquiry'}`,
      html: emailContent,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Thank you for your enquiry',
      html: `
        <h3>Thank you for contacting us!</h3>
        <p>We have received your enquiry and will get back to you shortly.</p>
        <p>Your message:</p>
        <p>${message}</p>
        <hr>
        <p>This is an automated email. Please do not reply to this message.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Email could not be sent',
      error: error.message,
    });
  }
};

// @desc    Send newsletter subscription email
// @route   POST /api/email/subscribe
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address',
      });
    }

    // TODO: Add email to newsletter database or service

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Newsletter Subscription Confirmation',
      html: `
        <h3>Thank you for subscribing to our newsletter!</h3>
        <p>You will now receive updates about our latest quizzes, study materials, and promotions.</p>
        <p>If you did not request this subscription, please ignore this email or contact us.</p>
        <hr>
        <p>This is an automated email. Please do not reply to this message.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'Subscription failed',
      error: error.message,
    });
  }
};

module.exports = {
  sendContactEmail,
  subscribeNewsletter,
}; 