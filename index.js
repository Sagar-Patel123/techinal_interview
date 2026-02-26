const express = require('express');
require('dotenv').config();
const app = express();
const dataRoutes = require("./routes/routes")
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(dataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
