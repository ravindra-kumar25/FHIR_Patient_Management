import React, { useState, useEffect } from 'react';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createPatient, updatePatient } from '../services/PatientService';

// Validation schema
const validationSchema = yup.object({
    given: yup.string('Enter first name').required('First name is required'),
    family: yup.string('Enter last name').required('Last name is required'),
    gender: yup.string('Select gender').required('Gender is required'),
    birthDate: yup.date('Enter date of birth').max(new Date(), 'Date of birth cannot be in the future').required('Date of birth is required'),
    telecom: yup.string('Enter phone number').matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
});

const PatientForm = ({ selectedPatient, onSave }) => {
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            given: '',
            family: '',
            gender: '',
            birthDate: '',
            telecom: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const patient = {
                resourceType: "Patient",
                id: selectedPatient ? selectedPatient.id : undefined,
                name: [{ given: [values.given], family: values.family }],
                gender: values.gender,
                birthDate: values.birthDate,
                telecom: [{ system: "phone", value: values.telecom }],
            };

            try {
                if (selectedPatient) {
                    await updatePatient(patient);
                } else {
                    await createPatient(patient);
                }
                onSave();
                setOpen(false);
            } catch (error) {
                console.error("Error creating/updating patient:", error);
            }
        },
    });

    useEffect(() => {
        if (selectedPatient) {
            formik.setValues({
                given: selectedPatient.name?.[0]?.given?.[0] || '',
                family: selectedPatient.name?.[0]?.family || '',
                gender: selectedPatient.gender || '',
                birthDate: selectedPatient.birthDate || '',
                telecom: selectedPatient.telecom?.[0]?.value || '',
            });
            setOpen(true);
        }
    }, [selectedPatient]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
            <Button variant="contained" color="success" onClick={handleOpen}>
                Create Patient
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedPatient ? 'Edit Patient' : 'Create Patient'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="First Name"
                                    name="given"
                                    value={formik.values.given}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.given && Boolean(formik.errors.given)}
                                    helperText={formik.touched.given && formik.errors.given}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Last Name"
                                    name="family"
                                    value={formik.values.family}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.family && Boolean(formik.errors.family)}
                                    helperText={formik.touched.family && formik.errors.family}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Gender"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    helperText={formik.touched.gender && formik.errors.gender}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date of Birth"
                                    name="birthDate"
                                    type="date"
                                    value={formik.values.birthDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone Number"
                                    name="telecom"
                                    value={formik.values.telecom}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.telecom && Boolean(formik.errors.telecom)}
                                    helperText={formik.touched.telecom && formik.errors.telecom}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={formik.handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PatientForm;
