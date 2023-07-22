import { Drawer, Grid, Box, Button, Fab } from "@mui/material"
import React, { useState } from "react"
import SideNav from "./components/sideNav"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function AdminHome() {

    const container = window !== undefined ? () => window.document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Box sx={{ display: 'flex' }} style={{ zIndex: -1 }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        style={{ zIndex: -1 }}
                        container={container}
                        open={mobileOpen}
                        sx={{
                            zIndex: -1,
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>

            <div className={'fab'} >
                <Button onClick={handleDrawerToggle}>
                    Test
                </Button>
            </div>

            <div className="admin-container" style={{
                marginTop: '160px',
                padding: '0 2.5%',
                backgroundColor: 'red',
            }}>
                <h1>
                    Hello world
                </h1>
            </div>
        </>
    )
}