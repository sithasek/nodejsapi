const app = require('./index');
const connectToMongoDB = require('./config/db');


const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    await connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});