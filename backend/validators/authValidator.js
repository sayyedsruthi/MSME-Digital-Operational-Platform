exports.loginValidator = {
  email: { required: true, type: "string" },
  password: { required: true, type: "string" }
};

exports.registerValidator = {
  name: { required: true, type: "string" },
  email: { required: true, type: "string" },
  password: { required: true, type: "string" },
  role: { required: true, type: "string" }
};
