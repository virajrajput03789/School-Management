const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }

  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: 'Address is required and must be a non-empty string.' });
  }

  if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: 'Latitude must be a number between -90 and 90.' });
  }

  if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Longitude must be a number between -180 and 180.' });
  }

  next();
};

const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: 'Latitude query parameter is required and must be a number between -90 and 90.' });
  }

  if (isNaN(lon) || lon < -180 || lon > 180) {
    return res.status(400).json({ error: 'Longitude query parameter is required and must be a number between -180 and 180.' });
  }

  // Attach parsed values to req for use in controller
  req.parsedCoords = { latitude: lat, longitude: lon };
  next();
};

module.exports = { validateAddSchool, validateListSchools };
