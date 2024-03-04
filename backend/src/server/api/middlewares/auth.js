const config = require('../../../../config')
const axios = require('axios');
const jwt = require('jsonwebtoken');
//const authConfig = (await axios.get("http://localhost:12345/data-model-mapper-gui/assets/config.json")).data
const authConfig = config.authConfig
const keycloakServerURL = authConfig.idmHost;
const realm = authConfig.authRealm;
const clientID = authConfig.clientId;
const clientSecret = authConfig.secret;

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = {
    auth: async (req, res, next) => {

        if (req.body.file)
            req.body = JSON.parse(req.body.file)

        if (authConfig.disableAuth)
            next()
        else {
            const authHeader = req.headers.authorization;

            if (authHeader) {
                const jwtToken = authHeader.split(' ')[1];

                let verifiedToken
                try {
                    verifiedToken = jwt.verify(jwtToken, //Buffer.from(
                        authConfig.publicKey
                        //, 'base64').toString()
                        //-------//
                        , { algorithms: ['RS256'] })
                }
                catch (error) {

                    console.error(error)
                    if (error.message == "invalid token" || error.message == "jwt expired")
                        return res.sendStatus(403);
                    else
                        return res.sendStatus(500);
                }


                if (authConfig.introspect) {
                    const introspectionEndpoint = `${keycloakServerURL}/realms/${realm}/protocol/openid-connect/token/introspect`;

                    const data = new URLSearchParams();
                    data.append('token', jwtToken);
                    data.append('client_id', clientID);
                    data.append('client_secret', clientSecret);

                    axios.post(introspectionEndpoint, data)
                        .then(response => {
                            if (response.data.active) {
                                console.log('Token valid:', response.data);
                                next();
                            } else {
                                console.log('Token not valid.');
                                res.sendStatus(403);
                            }
                        })
                        .catch(error => {
                            console.log(error.response.data)
                            console.error('Errore during token verify:', error.message);
                            res.sendStatus(500);
                        });
                }
                else {

                    const decodedToken = verifiedToken || parseJwt(jwtToken)

                    if ((decodedToken.azp == authConfig.clientId) && ((decodedToken.exp * 1000) > Date.now())) {

                        try {
                            let data = (await axios.get(config.authConfig.userInfoEndpoint, { headers: { "Authorization": req.headers.authorization } })).data
                            let { pilot, username } = data
                            req.body.bucketName = pilot.toLowerCase() //+ "/" + email + "/" + config.minioWriter.defaultBucketName//{pilot, email}
                            req.body.prefix = username + "/" + config.minioWriter.defaultBucketName
                        }
                        catch (error) {
                            console.error(error?.toString())
                            console.error(error?.response?.data)
                        }
                        next()
                    }
                    else
                        res.sendStatus(403);
                }
            }
            else
                res.sendStatus(401);
        }
    }
};