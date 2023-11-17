import { app, connectDB } from './src/app.js';
const port = process.env.PORT || 5000;


app.listen(port, () => {
    connectDB.then(() => {
        console.log('MongoDB Connected');
    }).catch((err) => {
        console.log(err);
    });
    console.log(`Server is running on port ${port}`);
});