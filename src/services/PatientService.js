import axios from 'axios';

const BASE_URL = 'http://hapi.fhir.org/baseR4';

const getPatients = async () => {
    const response = await axios.get(`${BASE_URL}/Patient`);
    if (response.data.entry) {
        const patients = response.data.entry.map(entry => entry.resource);
        return patients.sort((a, b) => new Date(b.meta.lastUpdated) - new Date(a.meta.lastUpdated));
    }
    return [];
};

const createPatient = async (patient) => {
    try {
        const response = await axios.post(`${BASE_URL}/Patient`, patient);
        return response.data;
    } catch (error) {
        console.error("Error creating patient:", error.response.data);
        throw error;
    }
};

const updatePatient = async (patient) => {
    try {
        const response = await axios.put(`${BASE_URL}/Patient/${patient.id}`, patient);
        return response.data;
    } catch (error) {
        console.error("Error updating patient:", error.response.data);
        throw error;
    }
};

const searchPatients = async (firstName, lastName, birthDate, phone) => {
    const params = {};
    if (firstName) params['given'] = firstName;
    if (lastName) params['family'] = lastName;
    if (birthDate) params['birthdate'] = birthDate;
    if (phone) params['telecom'] = phone;

    const response = await axios.get(`${BASE_URL}/Patient`, { params });
    if (response.data.entry) {
        const patients = response.data.entry.map(entry => entry.resource);
        return patients.sort((a, b) => new Date(b.meta.lastUpdated) - new Date(a.meta.lastUpdated));
    }
    return [];
};

export { getPatients, createPatient, updatePatient, searchPatients };
