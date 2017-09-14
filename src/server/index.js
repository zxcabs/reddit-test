const app = require('./app');
const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.log(`server started on ${PORT}`);
    }
});
