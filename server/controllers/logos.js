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

export default {
  getLogos,
};
