const rate_limit_service = require('../services/rate_limit');

exports.checkData = async (req, res) => {
 try {
    const userId = req.user.id;
    if(!userId){
        return res.status(400).json({message:"User ID is required"})
    }
    const ip = req.headers["x-forworded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const userAllowed = await rate_limit_service.checkUserLimit(userId);
    if (!userAllowed) {
        return res.status(429).json({ message: "Too many requests from this user. Please try again later." });
    }
    const ipAllowed = await rate_limit_service.checkIpLimit(ip);
    if (!ipAllowed) {
        return res.status(429).json({ message: "Too many requests from this IP address. Please try again later." });
    }
    await rate_limit_service.saveRateLogs(userId, ip);
    res.status(200).json({ message: "Request successful" });
 } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
 }
};
