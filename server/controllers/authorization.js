import bcrypt from "bcrypt";
import UserModel from "../models/api/user";
import LogoModel from "../models/api/logos";
import { LOGOS } from "../constants/logos";

const authorizeUser = async (req, res, next) => {
  const {
    body: { password, username },
  } = req;
  try {
    const authorizedUser = await UserModel.findOne({ username });
    const doesPasswordMatch = bcrypt.compareSync(
      password,
      authorizedUser.password
    );

    if (doesPasswordMatch) {
      res.send({ username: authorizedUser.username, _id: authorizedUser._id });
    }
    else {
      res.status(401).send({
        message: "Invalid Password!",
      });
    }

  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  const { body: register } = req;

  try {
    const saltRounds = 10;
    const myPlaintextPassword = register.password;

    const myHashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

    const userRes = await UserModel.create({ username: register.username, password: myHashedPassword })
    await LogoModel.create({ userId: userRes._id, logos: LOGOS });

    res.send(userRes);
  } catch (err) {
    next(err);
  }
}

const deleteUser = async (req, res, next) => {
  const { body: user } = req;

  try {

    await LogoModel.findOneAndDelete({ userId: user.id });
    await UserModel.findOneAndDelete({ _id: user.id });

    res.send(user);
  } catch (err) {
    next(err);
  }
}

const updateUser = async (req, res, next) => {
  const { body: user } = req;

  try {
    const saltRounds = 10;
    let myHashedPassword = "";

    if (user.password !== "") {
      myHashedPassword = await bcrypt.hash(user.password, saltRounds);
    }
    let payload = {
      username: user.username,
      password: myHashedPassword
    }
    if (payload.username === "") {
      delete payload.username;
    }
    if (payload.password === "") {
      delete payload.password;
    }
    await UserModel.findOneAndUpdate(
      { _id: user.id },
      payload
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
}



export default {
  authorizeUser,
  registerUser,
  deleteUser,
  updateUser,
};
