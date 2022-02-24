const verificationCodeGenerator = () => {
  return (num = Math.random().toFixed(8) * Math.pow(10, 8));
};

console.log(verificationCodeGenerator());
