import {
    Grid,
    Select,
    MenuItem,
    FormControl,
    Divider,
    Button,
    InputLabel,
    TextField,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import { MuiTelInput } from "mui-tel-input";

export default function UserForm(props) {
    const [id, setId] = useState(props.user.id);
    const [password, setPassword] = useState(props.user.password);
    const [auth, setAuth] = useState(props.user.auth ?? 1);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [dob, setDob] = useState(
        props.user.dob ? dayjs(props.user.dob) : dayjs(new Date())
    );
    const [phone, setPhone] = useState(props.user.phone ?? "+84");
    const [status, setStatus] = useState(props.user.status);
    const [department, setDepartment] = useState(
        props.user.department ?? "GCH"
    );
    const [email, setEmail] = useState(props.user.email);

    const [city, setCity] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [address, setAddress] = useState("");

    const departments = [
        {
            id: "GBH",
            name: "Business",
        },
        {
            id: "GCH",
            name: "Computing",
        },
        {
            id: "GDH",
            name: "Design",
        },
        {
            id: "GFH",
            name: "Finance",
        },
        {
            id: "GMH",
            name: "Marketing",
        },
    ];

    const handleDeactivate = (e) => {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/user/deactivate?id=" + id)
            .then((res) => {
                if (res.status === 200) {
                    props.closeHandler();
                }
            });
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        let user = {
            id: id,
            role: auth,
            firstName: firstName,
            lastName: lastName,
            dob: dayjs(dob).format("YYYY-MM-DD"),
            phone: phone,
            status: status ?? "activated",
            department_id: department,
            email: email,
            password: password,
            city: city,
            district: district,
            ward: ward,
            address: address,
        };
        console.log(user);

        if (
            auth &&
            firstName &&
            lastName &&
            dob &&
            phone &&
            department &&
            email
        ) {
            if (id) {
                console.log(id);
                axios
                    .put(
                        process.env.REACT_APP_HOST_URL + "/user?id=" + id,
                        user
                    )
                    .then((res) => {
                        console.log(res);
                        // if (res.status === 200) {
                        //     props.closeHandler();
                        // }
                    });
            } else {
                axios
                    .post(process.env.REACT_APP_HOST_URL + "/user", user)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            props.closeHandler();
                        }
                    });
            }
        }
    };

    const handlePhoneChange = (newValue) => {
        setPhone(newValue);
    };

    const handleClear = (e) => {
        e.preventDefault();
        // setPassword("");
        // setId("");
        // setAuth("");
        // setFirstName("");
        // setLastName("");
        // setDob(dayjs(new Date()));
        // setPhone("+84");
        // setStatus("");
        // setDepartment("");
        // setEmail("");
        props.closeHandler();
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h2 style={{ margin: 0 }}>Manage user</h2>
                    <p>You can manage the user data using this form</p>
                </Grid>
                <Divider />
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="auth-select-label">
                                    Auth Level
                                </InputLabel>
                                <Select
                                    id="form-role"
                                    labelId="auth-select-label"
                                    value={auth}
                                    label="Auth Level"
                                    onChange={(e) => {
                                        setAuth(e.target.value);
                                    }}>
                                    <MenuItem value={1}>User</MenuItem>
                                    <MenuItem value={2}>Lecturer</MenuItem>
                                    <MenuItem value={3}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                id="form-firstName"
                                fullWidth
                                label="First Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                id="form-lastName"
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DesktopDatePicker
                                sx={{
                                    width: "100%",
                                }}
                                onChange={(e) => {
                                    setDob(e);
                                }}
                                value={dob}
                                id="form-dob"
                                label="Date of Birth"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MuiTelInput
                                onlyCountries={["VN"]}
                                fullWidth
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                id="form-email"
                                fullWidth
                                label="Email"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="department-select-label">
                                    Department
                                </InputLabel>
                                <Select
                                    id="form-campus"
                                    labelId="department-select-label"
                                    value={department}
                                    label="Department"
                                    onChange={(e) => {
                                        setDepartment(e.target.value);
                                    }}>
                                    {departments.map((department) => (
                                        <MenuItem
                                            key={department.id}
                                            value={department.id}>
                                            {department.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                id="form-city"
                                fullWidth
                                label="City"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) => setDistrict(e.target.value)}
                                value={district}
                                id="form-district"
                                fullWidth
                                label="District"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={(e) => setWard(e.target.value)}
                                value={ward}
                                id="form-ward"
                                fullWidth
                                label="Ward"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                id="form-address"
                                fullWidth
                                label="Address"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {id && (
                    <Grid item xs={4} md={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ padding: "15px 30px" }}
                            color="error"
                            onClick={(e) => handleDeactivate(e)}>
                            Deactivate
                        </Button>
                    </Grid>
                )}
                <Grid item xs={id ? 4 : 6}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleConfirm(e)}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={id ? 4 : 6}>
                    <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        sx={{ padding: "15px 30px" }}
                        onClick={(e) => handleClear(e)}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
