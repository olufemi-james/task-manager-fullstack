

const sendEmail = async (options) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            sender: {
                name: "Task Manager",
                email: process.env.EMAIL_FROM
            },
            to: [
                {
                    email: options.email
                }
            ],
            subject: options.subject,
            htmlContent: options.message
        })
    });

    if (!response.ok) {
        const error = await response.text();

        console.error("Brevo API Error:", error);

        throw new Error(`Brevo email failed: ${response.status}`);
    }

    const data = await response.json();

    console.log("Brevo email sent:", data.messageId);

    return data;
};

module.exports = sendEmail;