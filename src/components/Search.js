import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Box } from '@mui/material';

const Search = ({ onSearch }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(firstName, lastName, birthDate, phone);
    };

    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setBirthDate('');
        setPhone('');
    };

    return (
        <Paper sx={{ padding: 2, marginBottom: 2, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date of Birth"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start">
                            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                                Search
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleClear}>
                                Clear
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default Search;
