import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
    Typography,
} from '@mui/material';

const PatientList = ({ patients, onSelect, onUpdate }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ marginTop: 2, borderRadius: 2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.length > 0 ? (
                            patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                                <TableRow key={patient.id} onClick={() => onSelect(patient)}>
                                    <TableCell>{patient.name?.[0]?.given?.[0] || 'Unnamed'}</TableCell>
                                    <TableCell>{patient.name?.[0]?.family || 'Unnamed'}</TableCell>
                                    <TableCell>{patient.gender || 'Unknown'}</TableCell>
                                    <TableCell>{patient.birthDate || 'Unknown'}</TableCell>
                                    <TableCell>{patient.telecom?.[0]?.value || 'Unknown'}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => onUpdate(patient)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography align="center">No match found, please refine search.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={patients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PatientList;
