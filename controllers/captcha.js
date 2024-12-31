const uuidv4 = require("uuid").v4;
const svgCaptcha = require("svg-captcha");
const redis = require("../redis");

exports.get = async (req, res, next) => {
  try {
    const captcha = svgCaptcha.create({
      size: 6,
      color: true,
      noise: 5,
    });

    const uuid = uuidv4();

    await redis.set(
      `captcha:${uuid}`,
      captcha.text.toLowerCase(),
      "EX",
      60 * 5
    );

    //* To log in, the user needs to enter a uuid and captcha, which are generated after sending the request and can be accessed in the console.

    //TODO : Clear Logs

    console.log("UUID -->", uuid);
    console.log("Captcha -->", captcha.text);

    res.json({
      uuid,
      captcha: captcha.data,
    });
  } catch (error) {
    next(error);
  }
};
