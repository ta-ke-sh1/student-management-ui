import { useEffect, useState } from "react";
import { Grid, Hidden, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonalInfo from "./views/components/personalInfo";

export default function UserHome() {
    return (
        <>
            <div className="main-container">
                <div className="course-head-banner" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 1 + ".jpg)",
                    backgroundSize: 'contain',
                    borderBottomLeftRadius: '50px'
                }}>
                </div>
                <div className="page-content" style={{
                    width: '98%'
                }}>
                    <Grid container spacing={4}>
                        <Hidden lgDown={'md'}>
                            <Grid item sm={0} md={2}>
                                <div className="big-widget">
                                    <div className="nav-menu">

                                    </div>
                                </div>
                            </Grid>
                        </Hidden>
                        <Grid item sm={12} md={10}>
                            <PersonalInfo />
                        </Grid>
                    </Grid>
                </div>
            </div >
        </>
    )
}
