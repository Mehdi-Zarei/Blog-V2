const redis = require("../redis");

module.exports = async (req, res, next) => {
  try {
    const { uuid, captcha } = req.body;

    const cachedCaptcha = await redis.get(`captcha:${uuid}`);

    if (cachedCaptcha) {
      await redis.del(`captcha:${uuid}`);
    }

    if (cachedCaptcha !== captcha.toLowerCase()) {
      return res.status(401).json({ message: "Invalid Captcha !!" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
