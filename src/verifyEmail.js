const { connectDb } = require("./connectDb");
const db = connectDb();

//1.get user email, generate verification code both sent to Db and useremail.
//2.get user verification code compare to the one on Db

exports.sendVerificationCode = async (req, res) => {
  const emailResponseObject = {
    email: req.body.email,
    verificationCode: code,
  };

  console.log(emailResponseObject);

  await db
    .collection("verification-code")
    .add({ verificationCode: emailResponseObject.verificationCode });
  emailResponseObject.message =
    "your verification code is sent, plz check your email";
  res.send(emailResponseObject);
};

const emailVerify = async (verificationCode) => {
    try {
        const snapshot = await db
          .collection("verification-code")
          .where("verificationCode", "==", verificationCode)
          .get();
        return snapshot.docs.length > 0;
      } catch (err) {
        console.log(err);
        return false;
      }
      
};

exports.isEmailVerified = async (req, res) => {
  const emailResponseObject = {
    verificationCode: req.query.verificationCode,
    isVerified: false,
  };

    const verifyEmail = emailVerify(emailResponseObject.verificationCode);
    console.log(verifyEmail)
    emailResponseObject.isVerified = verifyEmail;

    if (verifyEmail == true) {
      emailResponseObject.message = "Email verified";
    } else if (verifyEmail == false) {
      emailResponseObject.message = "wrong code plz try again";
    }

  res.send(emailResponseObject);
};

const verificationCodeGenerator = () => {
  return (num = Math.random().toFixed(8) * Math.pow(10, 8));
};

const code = verificationCodeGenerator();
