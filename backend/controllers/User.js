const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util");
const expressAsyncHandler = require("express-async-handler");
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      return res.status(402).send({ message: "user already exist" });
    } else {
      const newUser = new userModel({
        name: name,
        email: email,
        phone: phone,
        password: bcrypt.hashSync(password, 10),
      });

      await newUser.save();
      return res
        .status(200)
        .send({ message: "user registered successfully", user: newUser });
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

exports.login = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      const userPasswordCheck = await bcrypt.compareSync(
        password,
        checkUser.password
      );

      if (userPasswordCheck) {
        res.send({
          _id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          phone: checkUser.phone,
          token: generateToken(checkUser),
        });
        return;
      } else {
        res.status(401).send({ message: "password does not match match" });
      }
    } else {
      res.status(401).send({ message: "user does not exist" });
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});
