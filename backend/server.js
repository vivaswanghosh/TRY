const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// routes
const assignmentRoutes = require('./routes/assignmentRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const routineRoutes = require('./routes/routineRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const swapRoutes = require('./routes/swapRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/assignments', assignmentRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/routine', routineRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/users', userRoutes);

// simple health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
