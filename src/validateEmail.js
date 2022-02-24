const { connectDb } = require("./connectDb");
const db = connectDb();

exports.isEmailValid = async (req, res) => {
  /*
  1. Check if email is taken
        - if true, return message saying "Email is already taken"
        - if false, continue
  2. Check if school is registered
        - if true, return isValid = true
        - if false, return isValud = false & message "Your school is not currently available on Walky"
  */

  const emailResponseObject = {
    email: req.query.email,
    isValid: false,
  };
  
  const isEmailTaken = await isUserEmailTaken(emailResponseObject.email);
  const isCollegeRegistered = await isSchoolRegistered(emailResponseObject.email);
  emailResponseObject.isValid = isEmailTaken == false && isCollegeRegistered == true;

  if (isEmailTaken == true) {
    emailResponseObject.message = "Email is already taken";
  } else if (isCollegeRegistered == false) {
    emailResponseObject.message = "Your school is not currently available on Walky";
  }

  res.send(emailResponseObject);
};

// Private function, not exposed to other files
const isSchoolRegistered = async (email) => {
  // 1. Parse domain name from email string
  // 2. Search collection for domaain name
  // 3. if exists, return true. otherwise return false
  const emailDomainName = email.substring(email.lastIndexOf("@") + 1);
  try {
    const snapshot = await db
      .collection("university-email-domains")
      .where("domain-name", "==", `@${emailDomainName}`)
      .get();
    return snapshot.docs.length > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const isUserEmailTaken = async (email) => {
  try {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    return snapshot.docs.length > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
};


