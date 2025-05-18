// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [medicalRecordData, setMedicalRecordData] = useState({
//     diagnosis: '',
//     prescription: '',
//     notes: '',
//   });

//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateMedicalRecord = async (appointmentId) => {
//   setLoading(true);
//   try {
//     // Ensure medicalHistory is sent properly
//     const medicalHistory = {
//       diagnosis: medicalRecordData.diagnosis,
//       prescription: medicalRecordData.prescription,
//       notes: medicalRecordData.notes,
//     };

//     const response = await axios.put(
//       `/api/appointments/${appointmentId}/medical-record`,
//       { medicalHistory },  // Send the medicalHistory object
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`, // Ensure token is passed in headers
//         },
//       }
//     );

//     setErrorMessage('Medical record updated successfully');
//     setMedicalRecordData({
//       diagnosis: '',
//       prescription: '',
//       notes: '',
//     });
//   } catch (error) {
//     console.log('Error in updating medical record:', error);  // Log error for better debugging
//     setErrorMessage(error.response?.data?.message || 'Error updating medical record');
//   } finally {
//     setLoading(false);
//   }
// };


//   // Handle input change for medical record form
//   const handleMedicalRecordChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalRecordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//                 {appointment.status === 'Completed' && (
//                   <div className="medical-records-form">
//                     <textarea
//                       placeholder="Diagnosis"
//                       name="diagnosis"
//                       value={medicalRecordData.diagnosis}
//                       onChange={handleMedicalRecordChange}
//                     />
//                     <textarea
//                       placeholder="Prescription"
//                       name="prescription"
//                       value={medicalRecordData.prescription}
//                       onChange={handleMedicalRecordChange}
//                     />
//                     <textarea
//                       placeholder="Notes"
//                       name="notes"
//                       value={medicalRecordData.notes}
//                       onChange={handleMedicalRecordChange}
//                     />
//                     <button
//                       onClick={() => updateMedicalRecord(appointment._id)}
//                       disabled={loading}
//                     >
//                       Save Medical Record
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [medicalRecordData, setMedicalRecordData] = useState({
//     diagnosis: '',
//     prescription: '',
//     notes: '',
//   });

//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateMedicalRecord = async (appointmentId) => {
//     setLoading(true);
//     try {
//       const medicalHistory = {
//         diagnosis: medicalRecordData.diagnosis,
//         prescription: medicalRecordData.prescription,
//         notes: medicalRecordData.notes,
//       };

//       const response = await axios.put(
//         `/api/appointments/${appointmentId}/medical-record`,
//         { medicalHistory },  // Send the medicalHistory object
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Ensure token is passed in headers
//           },
//         }
//       );

//       setErrorMessage('Medical record updated successfully');
//       setMedicalRecordData({
//         diagnosis: '',
//         prescription: '',
//         notes: '',
//       });
//     } catch (error) {
//       console.log('Error in updating medical record:', error);  // Log error for better debugging
//       setErrorMessage(error.response?.data?.message || 'Error updating medical record');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input change for medical record form
//   const handleMedicalRecordChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalRecordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//                 {/* Remove Medical Record Form */}
//                 {/* {appointment.status === 'Completed' && (
//                   <div className="medical-records-form">
//                     <textarea
//                       placeholder="Diagnosis"
//                       name="diagnosis"
//                       value={medicalRecordData.diagnosis}
//                       onChange={handleMedicalRecordChange}
//                     />
//                     <textarea
//                       placeholder="Prescription"
//                       name="prescription"
//                       value={medicalRecordData.prescription}
//                       onChange={handleMedicalRecordChange}
//                     />
//                     <textarea
//                       placeholder="Notes"
//                       name="notes"
//                       value={medicalRecordData.notes}
//                       onChange={handleMedicalRecordChange}
//                     />
//                     <button
//                       onClick={() => updateMedicalRecord(appointment._id)}
//                       disabled={loading}
//                     >
//                       Save Medical Record
//                     </button>
//                   </div>
//                 )} */}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;












//working

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [medicalRecordData, setMedicalRecordData] = useState({
//     diagnosis: '',
//     prescription: '',
//     notes: '',
//   });

//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateMedicalRecord = async (appointmentId) => {
//     setLoading(true);
//     try {
//       const medicalHistory = {
//         diagnosis: medicalRecordData.diagnosis,
//         prescription: medicalRecordData.prescription,
//         notes: medicalRecordData.notes,
//       };

//       const response = await axios.put(
//         `/api/appointments/${appointmentId}/medical-record`,
//         { medicalHistory },  // Send the medicalHistory object
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Ensure token is passed in headers
//           },
//         }
//       );

//       setErrorMessage('Medical record updated successfully');
//       setMedicalRecordData({
//         diagnosis: '',
//         prescription: '',
//         notes: '',
//       });
//     } catch (error) {
//       console.log('Error in updating medical record:', error);  // Log error for better debugging
//       setErrorMessage(error.response?.data?.message || 'Error updating medical record');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input change for medical record form
//   const handleMedicalRecordChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalRecordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Navigate back to the dashboard
//   const goBackToDashboard = () => {
//     navigate('/dashboard'); // Adjust the route to your main dashboard path
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {/* Back to Dashboard Button */}
//       <button className="back-to-dashboard" onClick={goBackToDashboard}>
//         Back to Dashboard
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to the medical history page
//   const viewMedicalHistory = (patientId) => {
//     navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {/* Back to Dashboard Button */}
//       <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
//         Back to Dashboard
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//                 {/* New button to view medical history */}
//                 <button onClick={() => viewMedicalHistory(appointment.patient._id)}>
//                   View Medical History
//                 </button>

//                 <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//   Update Medical Report
// </button>

//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';
// import DoctorSeeReport from './DoctorSeeReport'; // Import DoctorSeeReport

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
//   const [selectedPatientId, setSelectedPatientId] = useState(null); // Store selected patient's ID for medical history
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId');
//   const token = localStorage.getItem('token');

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open the medical history modal
//   const viewMedicalHistory = (patientId) => {
//     setSelectedPatientId(patientId);
//     setIsModalOpen(true);
//   };

//   // Close the medical history modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPatientId(null);
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {/* Back to Dashboard Button */}
//       <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
//         Back to Dashboard
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}

//                 {/* New button to view medical history */}
//                 <button onClick={() => viewMedicalHistory(appointment.patient._id)}>
//                   View Medical History
//                 </button>

//                 <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                   Update Medical Report
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal for Medical History */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button onClick={closeModal} className="close-btn">X</button>
//             <DoctorSeeReport patientId={selectedPatientId} closeModal={closeModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');  // If no valid token, go to login
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to the medical history page
//   const viewMedicalHistory = (patientId) => {
//     navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//   };

//   // Navigate to the appointments list if doctor presses 'Back to Dashboard'
//   const backToDashboard = () => {
//     navigate(`/doctor/${doctorId}/appointments`);
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {/* Back to Dashboard Button */}
//       <button className="back-to-dashboard" onClick={backToDashboard}>
//         Back to Dashboard
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//                 {/* New button to view medical history */}
//                 <button onClick={() => viewMedicalHistory(appointment.patient._id)}>
//                   View Medical History
//                 </button>

//                 <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                   Update Medical Report
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');  // If no valid token, go to login
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to the medical history page
//   const viewMedicalHistory = (patientId) => {
//     navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//   };

//   // Log out and redirect to login page
//   const logOut = () => {
//     // Clear the doctor-related data from localStorage
//     localStorage.removeItem('doctorId');
//     localStorage.removeItem('token');
//     navigate('/login');  // Redirect to login page
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {/* Log out Button */}
//       <button className="back-to-dashboard" onClick={logOut}>
//         Log Out
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient.fullName}</p>
//               <p>Email: {appointment.patient.email}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//                 {/* New button to view medical history */}
//                 <button onClick={() => viewMedicalHistory(appointment.patient._id)}>
//                   View Medical History
//                 </button>

//                 <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                   Update Medical Report
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId'); // Assuming doctorId is stored in localStorage.
//   const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage.

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');  // If no valid token, go to login
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   // Handle appointment status change (confirm, cancel, complete)
//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
//           }
//         }
//       );
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment._id === appointmentId ? { ...appointment, status } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigate to the medical history page
//   const viewMedicalHistory = (patientId) => {
//     navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//   };

//   // Log out and redirect to login page
//   const logOut = () => {
//     // Clear the doctor-related data from localStorage
//     localStorage.removeItem('doctorId');
//     localStorage.removeItem('token');
//     navigate('/login');  // Redirect to login page
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>

//       {/* Log out Button */}
//       <button className="back-to-dashboard" onClick={logOut}>
//         Log Out
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => (
//             <div key={appointment._id} className="appointment-card">
//               <p>Patient: {appointment.patient ? appointment.patient.fullName : 'Unknown'}</p>
//               <p>Email: {appointment.patient ? appointment.patient.email : 'N/A'}</p>
//               <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//               <p>Time: {appointment.appointmentTime}</p>
//               <p>Status: {appointment.status}</p>

//               <div className="appointment-actions">
//                 {appointment.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                   </>
//                 )}
//                 {appointment.status === 'Confirmed' && (
//                   <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                 )}
//                 {/* New button to view medical history */}
//                 <button onClick={() => viewMedicalHistory(appointment.patient ? appointment.patient._id : '')}>
//                   View Medical History
//                 </button>

//                 <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                   Update Medical Report
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         }
//       );

//       // Update only the modified appointment without affecting others
//       setAppointments(prevAppointments => 
//         prevAppointments.map(appointment =>
//           appointment._id === appointmentId ? { ...appointment, status } : appointment
//         )
//       );

//       // Log the updated appointments after the state has been updated
//       console.log('Appointments after status update:', appointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewMedicalHistory = (patientId) => {
//     if (patientId) {
//       navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//     } else {
//       setErrorMessage("Invalid patient ID");
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem('doctorId');
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>
//       <button className="back-to-dashboard" onClick={logOut}>
//         Log Out
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => {
//             const patient = appointment.patient || {};
//             const patientName = patient.fullName || 'Unknown';
//             const patientEmail = patient.email || 'N/A';
//             const patientId = patient._id;

//             return (
//               <div key={appointment._id} className="appointment-card">
//                 <p>Patient: {patientName}</p>
//                 <p>Email: {patientEmail}</p>
//                 <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//                 <p>Time: {appointment.appointmentTime}</p>
//                 <p>Status: {appointment.status}</p>

//                 <div className="appointment-actions">
//                   {appointment.status === 'Pending' && (
//                     <>
//                       <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                       <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                     </>
//                   )}
//                   {appointment.status === 'Confirmed' && (
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                   )}
//                   <button onClick={() => viewMedicalHistory(patientId)}>
//                     View Medical History
//                   </button>
//                   <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                     Update Medical Report
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

//   import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         }
//       );

//       // Update only the modified appointment without affecting others
//       setAppointments(prevAppointments => 
//         prevAppointments.map(appointment =>
//           appointment._id === appointmentId ? { ...appointment, status } : appointment
//         )
//       );

//       // Log the updated appointments after the state has been updated
//       console.log('Appointments after status update:', appointments);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewMedicalHistory = (patientId) => {
//     if (patientId) {
//       navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//     } else {
//       setErrorMessage("Invalid patient ID");
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem('doctorId');
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>
//       <button className="back-to-dashboard" onClick={logOut}>
//         Log Out
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => {
//             const patient = appointment.patient || {};
//             const patientName = patient.fullName || 'Unknown';
//             const patientEmail = patient.email || 'N/A';
//             const patientId = patient._id;

//             return (
//               <div key={appointment._id} className="appointment-card">
//                 <p>Patient: {patientName}</p>
//                 <p>Email: {patientEmail}</p>
//                 <p>Date: {moment(appointment.appointmentDate).format('LL')}</p>
//                 <p>Time: {appointment.appointmentTime}</p>
//                 <p>Status: {appointment.status}</p>

//                  <div className="appointment-actions">
//                   {appointment.status === 'Pending' && (
//                     <>
//                       <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                       <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                     </>
//                   )}
//                   {appointment.status === 'Confirmed' && (
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>Mark as Completed</button>
//                   )}
//                   <button onClick={() => viewMedicalHistory(patientId)}>
//                     View Medical History
//                   </button>
//                   <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                     Update Medical Report
//                   </button>
//                 </div>
//               </div> 
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import './DoctorDashboard.css';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const doctorId = localStorage.getItem('doctorId');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/appointments/doctor/${doctorId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setErrorMessage('Authorization token missing or invalid');
//           navigate('/login');
//         } else {
//           setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId, token, navigate]);

//   const updateAppointmentStatus = async (appointmentId, status) => {
//     setLoading(true);
//     try {
//       await axios.patch(
//         `/api/appointments/update-status/${appointmentId}`,
//         { status },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         }
//       );

//       setAppointments(prevAppointments =>
//         prevAppointments.map(appointment =>
//           appointment._id === appointmentId ? { ...appointment, status } : appointment
//         )
//       );
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewMedicalHistory = (patientId) => {
//     if (patientId) {
//       navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
//     } else {
//       setErrorMessage("Invalid patient ID");
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem('doctorId');
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <>
//       <div className="login-header">
//   {/* LEFT: Logo */}
//   <div className="navbar-left" onClick={() => navigate('/dashboard')}>
//     <img src="/logomedicare.jpg" alt="Logo" className="logo" />
//   </div>

//   {/* RIGHT: Home and Logout */}
//   <div className="navbar-right">
//     <button className="home-btn" onClick={() => navigate('/dashboard')}>Home</button>
//     <button
//       className="logout-btn"
//       onClick={() => {
//         localStorage.removeItem('token');
//         window.location.href = '/login';
//       }}
//     >
//       Logout
//     </button>
//   </div>
// </div>
//     <div className="doctor-dashboard">
//       <h2>Doctor Dashboard</h2>
//       {/* <button className="back-to-dashboard" onClick={logOut}>
//         Log Out
//       </button> */}

//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {loading && <p>Loading...</p>}

//       <h3>Upcoming Appointments</h3>
//       <div className="appointments-list">
//         {appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appointment) => {
//             const patient = appointment.patient || {};
//             const patientName = patient.fullName || 'Unknown';
//             const patientEmail = patient.email || 'N/A';
//             const patientId = patient._id;

//             return (
//               <div key={appointment._id} className="appointment-card">
//                 <p>Patient: {patientName}</p>
//                 <p>Email: {patientEmail}</p>
//                 <p>Date: {moment(appointment.appointmentDate, moment.ISO_8601, true).isValid() ? moment(appointment.appointmentDate).format('LL') : appointment.appointmentDate}</p>
//                 <p>Time: {appointment.appointmentTime}</p>
//                 <p>Status: {appointment.status}</p>

//                 <div className="appointment-actions">
//                   {/* Always show View Medical History */}
//                   <button onClick={() => viewMedicalHistory(patientId)}>
//                     View Medical History
//                   </button>

//                   {/* Show Confirm and Cancel if status is Pending */}
//                   {appointment.status === 'Pending' && (
//                     <>
//                       <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>Confirm</button>
//                       <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>Cancel</button>
//                     </>
//                   )}

//                   {/* Show Mark as Completed if status is Confirmed */}
//                   {appointment.status === 'Confirmed' && (
//                     <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>
//                       Mark as Completed
//                     </button>
//                   )}

//                   {/* Show Update Medical Report if status is Completed */}
//                   {appointment.status === 'Completed' && (
//                     <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
//                       Update Medical Report
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default DoctorDashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './DoctorDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const doctorId = localStorage.getItem('doctorId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_BASE_URL);
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/appointments/doctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          setErrorMessage('Authorization token missing or invalid');
          navigate('/login');
        } else {
          setErrorMessage(error.response?.data?.message || 'Error fetching appointments');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId, token, navigate]);

  const updateAppointmentStatus = async (appointmentId, status) => {
    setLoading(true);
    try {
      await axios.patch(
        `${API_BASE_URL}/api/appointments/update-status/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error updating appointment status');
    } finally {
      setLoading(false);
    }
  };

  const viewMedicalHistory = (patientId) => {
    if (patientId) {
      navigate(`/doctor/${doctorId}/patient/${patientId}/medical-history`);
    } else {
      setErrorMessage('Invalid patient ID');
    }
  };

  const logOut = () => {
    localStorage.removeItem('doctorId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className="login-header">
        {/* LEFT: Logo */}
        <div className="navbar-left" onClick={() => navigate('/dashboard')}>
          <img src="/logomedicare.jpg" alt="Logo" className="logo" />
        </div>

        {/* RIGHT: Home and Logout */}
        <div className="navbar-right">
          <button className="home-btn" onClick={() => navigate('/dashboard')}>
            Home
          </button>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="doctor-dashboard">
        <h2>Doctor Dashboard</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {loading && <p>Loading...</p>}

        <h3>Upcoming Appointments</h3>
        <div className="appointments-list">
          {appointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            appointments.map((appointment) => {
              const patient = appointment.patient || {};
              const patientName = patient.fullName || 'Unknown';
              const patientEmail = patient.email || 'N/A';
              const patientId = patient._id;

              return (
                <div key={appointment._id} className="appointment-card">
                  <p>Patient: {patientName}</p>
                  <p>Email: {patientEmail}</p>
                  <p>
                    Date:{' '}
                    {moment(appointment.appointmentDate, moment.ISO_8601, true).isValid()
                      ? moment(appointment.appointmentDate).format('LL')
                      : appointment.appointmentDate}
                  </p>
                  <p>Time: {appointment.appointmentTime}</p>
                  <p>Status: {appointment.status}</p>

                  <div className="appointment-actions">
                    <button onClick={() => viewMedicalHistory(patientId)}>View Medical History</button>

                    {appointment.status === 'Pending' && (
                      <>
                        <button onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}>
                          Confirm
                        </button>
                        <button onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}>
                          Cancel
                        </button>
                      </>
                    )}

                    {appointment.status === 'Confirmed' && (
                      <button onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>
                        Mark as Completed
                      </button>
                    )}

                    {appointment.status === 'Completed' && (
                      <button onClick={() => navigate(`/update-medical/${appointment._id}`)}>
                        Update Medical Report
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
