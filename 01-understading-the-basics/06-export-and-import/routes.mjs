import fs from 'fs';

export const test = 'test';
export const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(`
        <html>
        <head><title>Enter Message</title></head>
        <body>
        <form action="/message" method="POST">
        <input type="text" name="input">
        <button type="submit">Send</button>
        </form></body>
        </html> 
        
        `);
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

    }
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
    <head>
        <title>
            My First Page
        </title>
    </head> 
    <body>
        <h1>
            Hello from my node.js server
        </h1>
    </body>
    </html> 
    `);

    res.end();
};