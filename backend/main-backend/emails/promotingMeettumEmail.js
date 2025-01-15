import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function promotingMeettumEmail({ email, username }) {
  const msg = {
    to: email,
    from: "noreply@meettum.com",
    subject: "Exciting News: InCode Just Got More Affordable!",
    text: "Exciting News: InCode Just Got More Affordable!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exciting News: InCode Just Got More Affordable!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(90deg, #6A11CB, #2575FC);
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #6A11CB;
        }
        .cta-button {
            display: inline-block;
            background: #6A11CB;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
        .cta-button:hover {
            background: #2575FC;
        }
        .footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .footer a {
            color: #6A11CB;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Exciting News: InCode Just Got More Affordable!</h1>
        </div>
        <div class="content">
            <h2>Hi ${username},</h2>
            <p>We’ve been listening to your feedback, and we’re thrilled to announce that we’re reducing the price of InCode to make it more accessible to everyone. Starting now, you can enjoy all the powerful features of InCode for just <strong>$15/month</strong>!</p>
            <p><strong>Here’s the updated pricing:</strong></p>
            <ul>
                <li><strong>Monthly Plan:</strong> $15/month</li>
                <li><strong>6-Month Plan:</strong> $75 (Save ~17%)</li>
                <li><strong>Annual Plan:</strong> $140 (Save ~22%)</li>
            </ul>
            <p>You’ll continue to have access to all the tools that make InCode a game-changer:</p>
            <ul>
                <li>Real-time collaboration</li>
                <li>Persistent code storage (paid plans only)</li>
                <li>AI-powered coding assistance</li>
            </ul>
            <p>We’re committed to helping you collaborate, code, and create with ease, and this price adjustment is part of our mission to make InCode accessible to everyone.</p>
            <a href="https://code.meettum.com/app/join/pro" class="cta-button">Upgrade Now and Save</a>
        </div>
      
    </div>
</body>
</html>


`,
  };
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error.response.body);
    });
}
export default promotingMeettumEmail;
