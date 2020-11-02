let nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const fs = require('fs');
const path = require("path");

module.exports = class Mailer {
    async send(mailOptions) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                // port: '465',
                auth: {
                    user: "<email>",
                    pass: "<password>",
                }
            });

            let info = await transporter.sendMail(mailOptions);
            return { response: { message: "Email sent sucessfully", info: info } };
        } catch (err) {
            console.log("TCL: Mailer -> send -> err", err)
            throw new Error('Something went wrong while trying to sent email!');
        }
    }

    async buildTemplate(templateName, replacements) {
        const html = await fs.readFileSync(path.join(__dirname, "../public/email/" + templateName), 'utf-8');
        const template = await handlebars.compile(html);

        return await template(replacements);
    }
}
