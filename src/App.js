import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import Search from './components/Search';
import { getPatients, searchPatients } from './services/PatientService';

// Create a theme with Material Design color scheme
const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h4: {
            fontWeight: 500,
            letterSpacing: '0.25px',
        },
    },
    palette: {
        primary: {
            main: '#6200ea',
        },
        secondary: {
            main: '#03dac6',
        },
        background: {
            default: '#f5f5f5',
        },
        error: {
            main: '#b00020',
        },
    },
    spacing: 8,
});

const App = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        const data = await getPatients();
        setPatients(data);
    };

    const handleSave = () => {
        loadPatients();
        setSelectedPatient(null);
    };

    const handleSearch = async (firstName, lastName, birthDate, phone) => {
        const data = await searchPatients(firstName, lastName, birthDate, phone);
        setPatients(data);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: '5px solid', borderColor: 'primary.main', borderRadius: 2, padding: 2, marginTop: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ padding: 2, backgroundColor: 'background.default', marginBottom: 2, borderRadius: 1 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        FHIR Patient Management
                    </Typography>
                </Box>
                <Search onSearch={handleSearch} />
                <PatientForm selectedPatient={selectedPatient} onSave={handleSave} />
                <PatientList patients={patients} onSelect={setSelectedPatient} onUpdate={setSelectedPatient} />
            </Container>
        </ThemeProvider>
    );
};

export default App;
