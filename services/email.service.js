const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendLeadEmail(data) {
  try {
    await resend.emails.send({
      from: "Renovation Cost Guide <onboarding@resend.dev>",
      to: process.env.QUOTE_TO_EMAIL,
      subject: `New renovation lead: ${data.projectType}`,
      reply_to: data.email,
      text: `
New renovation enquiry

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Postcode: ${data.postcode}

Project: ${data.projectType}
Size: ${data.size}
Finish: ${data.finish}

Estimate range:
£${data.estimateLow} - £${data.estimateHigh}

Description:
${data.description}
      `,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

module.exports = { sendLeadEmail };
