const useMiddleware = {
  validateSignUp: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;
      if (!firstName) throw new Error("First name is required!");
      if (!lastName) throw new Error("Last name is required!");
      if (!email) throw new Error("Email is required!");
      if (!password) throw new Error("Password is required!");
      if (!confirmPassword) throw new Error("Confirm password is required!");
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
};
