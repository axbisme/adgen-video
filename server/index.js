const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// Add this line here to serve static video files
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
