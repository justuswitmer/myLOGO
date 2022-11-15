import LogoModel from "../models/api/logos";

const getLogos = async (req, res, next) => {
  const { body: _id } = req;
  try {
    let logoRes = await LogoModel.findOne({ userId: _id._id })

    res.send(logoRes.logos);
  } catch (error) {
    console.log("Unexpected error occurred: ", error);
    next(error);
  }
};

const removeLogo = async (req, res, next) => {
  const { body: logo } = req;

  try {
    await LogoModel.updateOne(
      { userId: logo.id },
      {
        $pull: { logos: logo.url }
      });
    res.send(logo);
  } catch (error) {
    console.log("Unexpected error occurred in removeLogo: ", error);
    next(error);
  }
};

const addLogo = async (req, res, next) => {
  const { body: logo } = req;
  try {
    await LogoModel.updateOne(
      { userId: logo.id },
      {
        $push: { logos: logo.url }
      });

    res.send(logo);
  } catch (error) {
    console.log("Unexpected error occurred in removeLogo: ", error);
    next(error);
  }
};

export default {
  getLogos,
  removeLogo,
  addLogo,
};
