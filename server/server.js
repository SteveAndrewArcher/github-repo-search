const path = require("path");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 4242);

app.use(express.static(path.join(__dirname, "..", "build")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})

app.listen(app.get('port'), () => {
    console.log("server started on port: " + app.get('port'));
});
