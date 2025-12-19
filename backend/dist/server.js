import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const app = express();
const port = process.env.PORT;
console.log(port);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
//# sourceMappingURL=server.js.map