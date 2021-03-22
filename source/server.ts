import https = require("https");
import { readFileSync } from 'fs';

const host = 'localhost';
const port = 8000;

class Server {
    public constructor(solutionWord: string) {

        const options = {
            key: readFileSync('./localhost.key'),
            cert: readFileSync('./localhost.crt')
        };

        const requestListener = function (req, res) {
            res.writeHead(200);
            res.end(solutionWord);
        };

        const server = https.createServer(options, requestListener);
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }

}

export default Server;
