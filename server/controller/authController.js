import Users from "../model/UserModel.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async(req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    if (!email|| !password) {
      res.status(400).json({ message: "Please enter all the fields" });
      return;
    }
    try {
      const existingUser = await Users.findOne({ email });
      if (!existingUser) {
        res.status(400).json({ message: "Invalid Email" });
        return;
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
  
      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }
      if (isPasswordCorrect) {
        const token = generateToken(existingUser);
  
        existingUser.password = undefined;
        existingUser.token = token;
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
          success: true,
          token: token,
          user:existingUser,
        });
      } else {
        res.status(400);
        throw new Error("Login failed");
      }
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong",error);
    }
};

// @desc    register user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async(req, res) => {
    const { email, password, name } = req.body;
  console.log(req.body);
  if (!email.trim() || !password.trim() || !name.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      username: name,
      email,
      password: hashedPassword,
    });
    console.log(user)
    if (user) {
      const token = generateToken(user);
      console.log(token)

      user.password = undefined;
      user.token = token;
     

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token: token,
        user,
      });
    } else {
      res.status(400);
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("something wrong",error);
  }
};
