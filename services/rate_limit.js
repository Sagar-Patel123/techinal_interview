const {rateLimit} = require('../models/rate_limits');

    exports.checkUserLimit = async (identifier, type) => {
        try {
            const one_minute = 60 * 1000; 
            const one_minute_ago = new Date(Date.now() - 60 * 1000 - one_minute);
            const rateLimitRecord = await rateLimit.count({ 
                where: {
                    identifier:identifier,
                    type:type,
                    created_at :{[Op.gte]:one_minute_ago}
                    } });
            return rateLimitRecord < 5;
        }catch(error){
        throw new Error("Unable to restrict rate limit ")
        }
    };

        exports.checkIpLimit = async (ip) => {
        try {
            const one_minute = 60 * 1000; 
            const one_minute_ago = new Date(Date.now() - 60 * 1000 - one_minute);
            const rateLimitRecord = await rateLimit.count({ 
                where: {
                    identifier:ip,
                    type:"IP",
                    created_at :{[Op.gte]:one_minute_ago}
                    } });
            return rateLimitRecord < 20;
        }catch(error){
        throw new Error("Unable to restrict IP rate limit ")
        }
    };

        exports.saveRateLogs = async (userId, ip) => {
        try {
            const rateLimitRecord = await rateLimit.bulkCreate([
                {identifier:userId ,type: "USER"},
                {identifier:ip, type:"IP"},
            ]);
           return rateLimitRecord;

        }catch(error){
        throw new Error("Unable to ristrict rate limit ")
        }
    };