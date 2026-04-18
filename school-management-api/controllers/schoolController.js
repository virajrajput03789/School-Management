const pool = require('../config/db');

// Helper function for Haversine distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: 'School added successfully',
      schoolId: result.insertId
    });
  } catch (err) {
    console.error('Error in addSchool:', err);
    res.status(500).json({ error: 'Failed to add school', details: err.message });
  }
};

const listSchools = async (req, res) => {
  const { latitude, longitude } = req.parsedCoords;

  try {
    const [schools] = await pool.query('SELECT * FROM schools');

    const sortedSchools = schools.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school, distance_km: parseFloat(distance.toFixed(2)) };
    }).sort((a, b) => a.distance_km - b.distance_km);

    res.status(200).json(sortedSchools);
  } catch (err) {
    console.error('Error in listSchools:', err);
    res.status(500).json({ error: 'Failed to fetch schools', details: err.message });
  }
};

module.exports = { addSchool, listSchools };
