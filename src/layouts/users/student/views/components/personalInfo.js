
import { useEffect, useState } from "react";
import { Grid, Hidden, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function PersonalInfo(props) {
    let user = {
        firstName: 'Son',
        lastName: 'Nguyen Thai',
        email: 'sonnt198003@fpt.edu.vn',
        phone: '0876 879 134',
        address: 'Toa nha FPT, So 2, Pham Van Bach, Ha Noi, Viet Nam',
        faculty: 'Ha Noi',
        major: "Software Engineering",
        dob: "2000/05/12"
    }

    return (
        <div className="big-widget" style={{
            overflowY: 'auto',
            padding: '20px'
        }}>
            <div
                className="basic-info"
                style={{
                    marginBottom: '40px'
                }}>
                <div className="profile-pic-container" style={{
                    backgroundImage: `url(${process.env.REACT_APP_HOST_URL}/image/avatar/sonnt/sonnt.jpg)`
                }}>
                </div>
                <div className="user-contact">
                    <div className="serif" style={{
                        fontSize: '1.75rem',
                        marginBottom: 0
                    }}>
                        {user.lastName + " " + user.firstName}
                    </div>
                    <span>{user.major}</span>
                </div>

            </div>
            <div className="big-widget inner-widget" style={{
                backgroundColor: 'white'
            }}>
                <div className="relative-container ">
                    <Tooltip title={"Edit"}>
                        <IconButton className="icon-btn">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <h3>Personal Information</h3>
                    <Grid container className="grid-container">
                        <Grid item xs={12} sm={6}>
                            <p>First Name</p>
                            <h4>{user.firstName}</h4>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Last Name</p>
                            <h4>{user.lastName}</h4>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Date of birth</p>
                            <h4>{user.dob}</h4>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Email</p>
                            <h4>{user.email}</h4>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Phone</p>
                            <h4>{user.phone}</h4>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <br />
            <div className="big-widget inner-widget" style={{
                backgroundColor: 'white'
            }}>
                <div className="relative-container ">
                    <Tooltip title={"Edit"}>
                        <IconButton className="icon-btn">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <h3>Address</h3>
                    <Grid container className="grid-container">
                        <Grid item xs={12} sm={6}>
                            <p>Country</p>
                            <h4>Vietnam</h4>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>City</p>
                            <h4>{user.faculty}</h4>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <p>Address</p>
                            <h4>{user.address}</h4>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}