import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars'; // hbs stands for 'handlebars'
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sendEmail = async (subject, send_to, sent_from, reply_to, template, name, link) => {
    // Create Email Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, '../views'),
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, '../views'),
        extName: ".handlebars"
    }

    transporter.use("compile", hbs(handlebarOptions));

    // Options for Sending Email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        template,
        subject,
        context: {
            name,
            link
        }
    }
    // Send Email
    transporter.sendMail(options, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    })
};

export default sendEmail;