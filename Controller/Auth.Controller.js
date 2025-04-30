import { signinSchema, signupSchema } from "../config/validate.js";
import { createHmac} from "crypto";

import { User } from "../Model/Auth.Model.js";
import { compare, hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { transporter } from "../config/sendMail.js";
// const User = require ('../Model/AuthModel.js')


export const verify = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Account will be Valide", loggedin :true });
  } catch (error) {
    console.log(error);
  }
};


export const Signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password,'hi');
    const { error, value } = signupSchema.validate({ email, password });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res
        .status(401)
        .json({ success: false, message: "User is Already Exist" });
    const hashPass = await hash(password, 12);
    console.log(hashPass);
    const newUser = new User({ email, password: hashPass });
    const result = await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Account will be created", result });
  } catch (error) {
    console.log(error);
  }
};

export const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log(email, password);
    const { error, value } = signinSchema.validate({ email, password });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser)
      return res
        .status(401)
        .json({ success: false, message: "User don't Exist" });
    console.log(password, existingUser.password);

    const hashCommpare = await compare(password, existingUser.password);
    // console.log(hashCommpare);

    if (!hashCommpare)
      return res
        .status(401)
        .json({ success: false, message: "Worng Creadendial" });
    const token = jsonwebtoken.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.JWT_SECRET
    );
    return res
    .status(200)
    .cookie("Authorization","Bearer " + token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 8 * 3600000),
    })
    .json({ success: true, message: "Login in successfully", token });
  } catch (error) {
    console.log(error);
  }
};
export const signOut = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ message: "logout successfully",loggedin :false });
};

export const sendVerificatoncode = async (req, res) => {
  const { email } = req.body;
  try {
    const { error, value } = signinSchema.validate({ email, password });

    const existingUser = await User.findOne({ email });
    // console.log(existingUser);

    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User does't Exist" });
    if (existingUser.verified)
      return res
        .status(400)
        .json({ success: false, message: "Your alrady verifiyed" });

    const verifyCode = Math.floor(Math.random() * 1000000).toString();

    let info = await transporter.sendMail({
      from: process.env.NODE_CODE_SENDING_MAIL_ADDRESS,
      to: existingUser.email,
      subject: "Verification Code",
      html: `<h1>${verifyCode}</h1>`,
    });
    console.log(info.accepted[0], existingUser.email);

    if ((info.accepted[0], existingUser.email)) {
      existingUser.verificationCode = await createHmac("sha256", "secret")
        .update(verifyCode)
        .digest("hex");
      existingUser.verificationCodeValidaton = Date.now();
      await existingUser.save();
      return res
        .status(200)
        .json({ success: true, message: "verification Code send" });
    }
  } catch (error) {
    // console.log(error, "data");
  }
};

export const verifyVerificatoncode = async (req, res) => {
  const { email, verifyCode } = req.body;
  // console.log(Date.now());

  try {
    const { error, value } = signinSchema.validate({ email, password });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });

    const existingUser = await User.findOne({ email }).select(
      "+verificationCode +verificationCodeValidaton"
    );
    // console.log(existingUser);

    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User does't Exist" });
    if (existingUser.verified)
      return res
        .status(400)
        .json({ success: false, message: "Your alrady verifiyed" });
    if (
      !existingUser.verificationCode ||
      !existingUser.verificationCodeValidaton
    )
      return res.status(400).json({ success: false, message: "Somthig wrong" });
    if (Date.now() - existingUser.verificationCodeValidaton > 5 * 60 * 1000)
      return res.status(400).json({ success: false, message: "Verification Code Expired!" });
    
    
    return res.status(200).json({ success: true, message: "test for time" });
  } catch (error) {
    console.log(error);
  }
};
