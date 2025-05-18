require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const medicalHistoryRoutes = require('./routes/medical.routes');
const emergencyRoutes = require('./routes/emergency.routes');
const adminRoutes = require('./routes/admin.routes');

// Middleware
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors({
  origin: ['https://medi-care-5r54.onrender.com', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🩺 Medi_Care API is running...');
});

// Global Error Handler
// app.use(errorHandler);

// Start server




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
