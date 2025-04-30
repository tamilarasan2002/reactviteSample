
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: 'abidm26792@gmail.com',
    pass: 'yregcrtctgahnlfr' ,
  },
});
// console.log(transporter.transporter);

