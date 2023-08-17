import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from "@mui/material";
import CustomTable from "../../../../components/table/table";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { users } from "../mockData/mock";

import { MuiTelInput } from 'mui-tel-input'
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function createData(id,
    role,
    firstName,
    lastName,
    dob,
    phone,
    status,
    department_id,
    email,
    password) {
    return {
        id,
        role,
        firstName,
        lastName,
        dob,
        phone,
        status,
        department_id,
        email,
        password
    };
}


const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
    {
        id: "role",
        numeric: true,
        disablePadding: false,
        label: "Auth Level",
    },
    {
        id: "firstName",
        numeric: true,
        disablePadding: false,
        label: "F. Name",
    },
    {
        id: "lastName",
        numeric: true,
        disablePadding: false,
        label: "L. Name",
    },
    {
        id: "dob",
        numeric: true,
        disablePadding: false,
        label: "Date of Birth",
    },
    {
        id: "phone",
        numeric: true,
        disablePadding: false,
        label: "Phone",
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Status",
    },
    {
        id: "department",
        numeric: true,
        disablePadding: false,
        label: "Department",
    },
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Email",
    },
];

export default function UsersAdmin() {
    let departments = [
        {
            id: 'GBH',
            name: 'Business'
        },
        {
            id: 'GCH',
            name: 'Computing'
        },
        {
            id: 'GDH',
            name: 'Design'
        },
        {
            id: 'GFH',
            name: 'Finance'
        },
        {
            id: 'GMH',
            name: 'Marketing'
        },
    ]

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(dayjs(new Date()))
    const [phone, setPhone] = useState("+84");
    const [status, setStatus] = useState('')
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');

    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogContent, setDialogContent] = useState("")

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([])
    useEffect(() => {
        fetchRows()
    }, [rows])

    const fetchRows = () => {
        let res = [];
        users.forEach((user) => {
            res.push(
                createData(user.id,
                    user.role,
                    user.firstName,
                    user.lastName,
                    user.dob,
                    user.phone,
                    user.status,
                    user.department_id,
                    user.email,
                    user.password
                ))
        })
        setRows(res)
    }

    const fetchUser = (id) => {
        return rows.find((row) => row.id === id)
    }

    const handleEdit = (id) => {
        let user = fetchUser(id)
        console.log(user)
        setPassword(user.password)
        setId(id)
        setAuth(user.role)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setDob(dayjs(user.dob))
        setPhone(user.phone.replaceAll(" ", ""))
        setStatus(user.status)
        setDepartment(user.department_id)
        setEmail(user.email)
    }

    const handleDelete = (index) => {
        setDialogTitle("Delete Room")
        setDialogContent("This room will be deleted, are you sure? This change cannot be undone")
        setOpen(true)
        console.log(index)
    }

    const handleConfirm = (e) => {
        e.preventDefault()
        let user = {
            id: id,
            role: auth,
            firstName: firstName,
            lastName: lastName,
            dob: dayjs(dob).format('YYYY-MM-DD'),
            phone: phone,
            status: status,
            department_id: department,
            email: email,
            password: password
        }

        if (id === "" ||
            auth === "" ||
            firstName === "" ||
            lastName === "" ||
            dob === "" ||
            phone === "" ||
            status === "" ||
            department === "" ||
            email === "") return;

        console.log(user)
        setDialogTitle("Edit User information")
        setDialogContent("Are you sure with those changes? Once saved, this change cannot be undone")
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handlePhoneChange = (newValue) => {
        setPhone(newValue)
    }

    const handleClear = (e) => {
        e.preventDefault();
        setPassword("")
        setId("")
        setAuth("")
        setFirstName("")
        setLastName("")
        setDob(dayjs(new Date()))
        setPhone("+84")
        setStatus("")
        setDepartment("")
        setEmail("")
    }

    return (
        <>
            <Grid container spacing={4} sx={{ width: '98.5%' }}>
                <Grid item sm={12} md={8} style={{ marginBottom: '30px' }}>
                    <div className="big-widget" style={{ paddingBottom: '25px' }}>
                        <h2>Users Control</h2>
                        <p>Edit or add new user here</p>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="auth-select-label">Auth Level</InputLabel>
                                    <Select
                                        id="form-role"
                                        labelId="auth-select-label"
                                        value={auth}
                                        label="Auth Level"
                                        onChange={(e) => {
                                            setAuth(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={1}>User</MenuItem>
                                        <MenuItem value={2}>Staff</MenuItem>
                                        <MenuItem value={3}>Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    id="form-firstName"
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    id="form-lastName"
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <DesktopDatePicker
                                    sx={{
                                        width: '100%'
                                    }}
                                    onChange={(e) => {
                                        setDob(e)
                                    }}
                                    value={dob}
                                    id="form-dob"
                                    label="Date of Birth"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiTelInput onlyCountries={["VN"]} fullWidth value={phone} onChange={handlePhoneChange} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="department-select-label">Department</InputLabel>
                                    <Select
                                        id="form-campus"
                                        labelId="department-select-label"
                                        value={department}
                                        label="Department"
                                        onChange={(e) => {
                                            setDepartment(e.target.value)
                                        }}
                                    >
                                        {departments.map((department) => <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    id="form-email"
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Button fullWidth variant="contained" sx={{ padding: '15px 30px' }} color="error" onClick={(e) => handleConfirm(e)}>Deactivate</Button>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Button fullWidth variant="contained" sx={{ padding: '15px 30px' }} color="error" onClick={(e) => handleConfirm(e)}>Reset Password</Button>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Button fullWidth variant="contained" sx={{ padding: '15px 30px' }} onClick={(e) => handleConfirm(e)}>Save</Button>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Button fullWidth variant="outlined" sx={{ padding: '15px 30px' }} onClick={(e) => handleClear(e)}>Clear</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid >
                <Grid item sm={12} md={4} style={{ marginBottom: '30px' }}>
                    <div style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 3 + ".jpg)",
                        width: '100%',
                        height: '385px',
                        borderRadius: '10px',
                        backgroundSize: 'contain'
                    }}>
                    </div>
                </Grid>
            </Grid >

            <Grid container style={{ width: '97%' }}>
                <Grid item xs={12}>
                    <div className="big-widget" >
                        <div className="campus-list">
                            <CustomTable
                                init_count={4}
                                title="Users"
                                rows={rows}
                                headCells={headCells}
                                colNames={["id",
                                    "role",
                                    "firstName",
                                    "lastName",
                                    "dob",
                                    "phone",
                                    "status",
                                    "department_id",
                                    "email",
                                    "password"]}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{
                    zIndex: 100000000000
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Accept</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    );
}
