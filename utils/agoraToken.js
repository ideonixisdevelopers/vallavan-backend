const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const generateRtcToken = (channelName, uid) => {
  const appId = process.env.AGORA_APP_ID;
  console.log(appId,"A")
  const appCertificate = process.env.AGORA_APP_CERT;

  const role = RtcRole.PUBLISHER;
  const expireTime = 3600; // 1 hour
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  return RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );
};

module.exports = { generateRtcToken };
