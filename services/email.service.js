const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function sendLeadEmail(data) {
  if (!resend) {
    console.log("RESEND_API_KEY missing — skipping email send locally.");
    console.log("Lead email data:", data);

    return {
      skipped: true,
      reason: "RESEND_API_KEY missing",
    };
  }

  try {
    return await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Renovation Cost Guide <onboarding@resend.dev>",
      to: process.env.QUOTE_TO_EMAIL || "casparr@hotmail.com",
      subject: `New renovation lead: ${data.projectType || "Unknown project"}`,
      reply_to: data.email,
      text: `
New renovation enquiry

Name: ${data.name || ""}
Email: ${data.email || ""}
Phone: ${data.phone || ""}
Postcode: ${data.postcode || ""}

Project: ${data.projectType || ""}
Size: ${data.size || ""}
Finish: ${data.finish || ""}

Estimate range:
£${data.estimateLow || ""} - £${data.estimateHigh || ""}

Description:
${data.description || ""}
      `,
    });
  } catch (error) {
    console.error("Email send failed:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = { sendLeadEmail };
