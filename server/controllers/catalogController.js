/**
 * Server Catalog Controller
 * Provides services, medical specialties, and doctor search logic on the backend.
 * Zero business logic on client.
 */

const SERVICES_DATA = [
  {
    id: 'video-consult',
    title: 'Instant Video Consultation',
    subtitle: 'Connect within 60 secs',
    tag: 'Instant',
    bgColor: '#93c5fd',
    image: '/images/instant_video_consult.jpg',
    link: '/video-consult',
  },
  {
    id: 'find-doctors',
    title: 'Find Doctors Near You',
    subtitle: 'Confirmed appointments',
    tag: 'Verified',
    bgColor: '#99f6e4',
    image: '/images/find_doctors_near.jpg',
    link: '/find-doctors',
  },
  {
    id: 'lab-tests',
    title: 'Lab Tests',
    subtitle: 'Safe and trusted lab tests',
    tag: 'Home Sample',
    bgColor: '#ddd6fe',
    image: '/images/lab_tests_sample.jpg',
    link: '/lab-tests',
  },
  {
    id: 'surgeries',
    title: 'Surgeries',
    subtitle: 'Safe and trusted surgery centers',
    tag: 'Insurance Free',
    bgColor: '#bae6fd',
    image: '/images/surgeries_surgeon.jpg',
    link: '/surgeries',
  },
];

const SPECIALTIES_DATA = [
  {
    id: 'period-doubts',
    name: 'Period doubts or Pregnancy',
    iconUrl: 'https://www.practostatic.com/consult/consult-home/symptoms_icon/irregular-painful+period.png',
    price: 499,
    description: 'Consult top gynecologists',
  },
  {
    id: 'skin-issues',
    name: 'Acne, pimple or skin issues',
    iconUrl: 'https://www.practostatic.com/consult/consult-home/symptoms_icon/Acne.png',
    price: 449,
    description: 'Consult top dermatologists',
  },
  {
    id: 'performance-issues',
    name: 'Performance issues in bed',
    iconUrl: 'https://www.practostatic.com/consult/consult-home/symptoms_icon/sexology.png',
    price: 599,
    description: 'Consult top sexologists',
  },
  {
    id: 'cold-fever',
    name: 'Cold, cough or fever',
    iconUrl: 'https://www.practostatic.com/consult/consult-home/symptoms_icon/coughing.png',
    price: 399,
    description: 'Consult top general physicians',
  },
  {
    id: 'child-wellness',
    name: 'Child not feeling well',
    iconUrl: 'https://www.practostatic.com/consult/consult-home/symptoms_icon/pediatric.png',
    price: 499,
    description: 'Consult top pediatricians',
  },
  {
    id: 'depression-anxiety',
    name: 'Depression or anxiety',
    iconUrl: 'https://www.practostatic.com/consult/consult-home/symptoms_icon/mental-wellness.png',
    price: 799,
    description: 'Consult top psychologists',
  },
];

const DOCTORS_DATA = [
  {
    id: 'doc-1',
    name: 'Dr. Clara Oswald',
    specialty: 'Dermatologist',
    experience: '12 years experience',
    rating: '98%',
    patientStories: 142,
    location: 'Kozhikode',
    clinic: 'Aster MIMS & Skin Specialist Care',
    fee: 500,
    availability: 'Available Today',
    image: '/images/find_doctors_near.jpg',
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Nair',
    specialty: 'General Physician',
    experience: '18 years experience',
    rating: '96%',
    patientStories: 320,
    location: 'Kozhikode',
    clinic: 'Baby Memorial Hospital Clinic',
    fee: 400,
    availability: 'Next slot in 15 mins',
    image: '/images/surgeries_surgeon.jpg',
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Sharma',
    specialty: 'Gynecologist',
    experience: '10 years experience',
    rating: '99%',
    patientStories: 215,
    location: 'Kozhikode',
    clinic: 'Mother & Child Care Wellness',
    fee: 600,
    availability: 'Available Tomorrow',
    image: '/images/find_doctors_near.jpg',
  },
  {
    id: 'doc-4',
    name: 'Dr. Arjun Varma',
    specialty: 'Surgeon & General Medicine',
    experience: '22 years experience',
    rating: '97%',
    patientStories: 512,
    location: 'Kozhikode',
    clinic: 'Kerala Specialty Surgical Clinic',
    fee: 700,
    availability: 'Available Today',
    image: '/images/surgeries_surgeon.jpg',
  },
];

// @desc    Get top service cards
// @route   GET /api/catalog/services
export const getServices = (req, res) => {
  res.status(200).json({
    success: true,
    data: SERVICES_DATA,
  });
};

// @desc    Get medical specialties
// @route   GET /api/catalog/specialties
export const getSpecialties = (req, res) => {
  res.status(200).json({
    success: true,
    count: SPECIALTIES_DATA.length,
    data: SPECIALTIES_DATA,
  });
};

// @desc    Search doctors with server-side query & location filter
// @route   GET /api/catalog/doctors
export const getDoctors = (req, res) => {
  const { query = '', location = '' } = req.query;

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedLocation = location.toLowerCase().trim();

  // Server-side filtering logic
  const filtered = DOCTORS_DATA.filter((doc) => {
    const matchesQuery =
      !normalizedQuery ||
      doc.name.toLowerCase().includes(normalizedQuery) ||
      doc.specialty.toLowerCase().includes(normalizedQuery) ||
      doc.clinic.toLowerCase().includes(normalizedQuery);

    const matchesLocation =
      !normalizedLocation ||
      doc.location.toLowerCase().includes(normalizedLocation);

    return matchesQuery && matchesLocation;
  });

  res.status(200).json({
    success: true,
    totalFound: filtered.length,
    locationApplied: location || 'All Locations',
    queryApplied: query || 'All Specialists',
    data: filtered,
  });
};
