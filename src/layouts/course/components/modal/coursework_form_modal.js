import {
    Grid,
    Button,
    Divider,
    TextField,
    List,
    ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateRangeIcon, LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { fromMilisecondsToDateString } from "../../../../utils/utils";

export default function CourseworkFormModal(props) {

    const [name, setName] = useState("")
    const [openDate, setOpenDate] = useState(new Date())
    const [deadline, setDeadline] = useState(new Date())
    const [closedDate, setClosedDate] = useState(new Date())

    const [selectedIndex, setSelectedIndex] = useState(1)

    useEffect(() => {

    }, [])

    const handleConfirm = () => {
        console.log({
            start: openDate,
            deadline: deadline,
            close: closedDate
        })
    }

    const handleItemClick = (index) => {
        setSelectedIndex(index)
    }

    const handleDateChange = (e) => {
        console.log(e)
        switch (selectedIndex) {
            case 1:
                setOpenDate(e)
                break;
            case 2:
                setDeadline(e)
                break;
            case 3:
                setClosedDate(e)
                break;
            default:
                console.log("Not available")
                break;
        }
    }

    return (<>
        <Grid
            container
            spacing={3}
            sx={{
                minWidth: "770px",
            }}>
            <Grid item xs={12} md={12}>
                <h2 style={{ margin: 0 }}>Manage Coursework Assignment</h2>
                <p>Manage the coursework assignment</p>
            </Grid>
            <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <StaticDateTimePicker onChange={(e) => {
                        handleDateChange(e)
                    }}
                        sx={{ height: '500px', marginTop: '-20px' }}
                        ampmInClock={true}
                        label="Select a Date"
                        slotProps={{ textField: { size: 'small' }, actionBar: { actions: [] } }} />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="form-name"
                            fullWidth
                            label="Assignment Name"
                            variant="outlined"
                            sx={{ marginBottom: '-10px' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div style={{ margin: '15px 0 5px 0' }}>Select the dates:</div>
                        <List sx={{
                            minWidth: 240,
                        }}>
                            <ListItemButton selected={selectedIndex === 1} onClick={() => handleItemClick(1)} className="date-list-btn" sx={{ marginBottom: '10px', borderRadius: '5px' }}>
                                <DateRangeIcon />
                                <div className="item-list-date">
                                    <span>Open Date</span>
                                    {fromMilisecondsToDateString(openDate)}
                                </div>
                            </ListItemButton>
                            <ListItemButton selected={selectedIndex === 2} onClick={() => handleItemClick(2)} className="date-list-btn" sx={{ marginBottom: '10px', borderRadius: '5px' }}>
                                <DateRangeIcon />
                                <div className="item-list-date">
                                    <span>Deadline</span>
                                    {fromMilisecondsToDateString(deadline)}
                                </div>
                            </ListItemButton>
                            <ListItemButton selected={selectedIndex === 3} onClick={() => handleItemClick(3)} className="date-list-btn" sx={{ borderRadius: '5px' }}>
                                <DateRangeIcon />
                                <div className="item-list-date">
                                    <span>Closed Date</span>
                                    {fromMilisecondsToDateString(closedDate)}
                                </div>
                            </ListItemButton>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ padding: "15px 30px" }}
                            onClick={(e) => handleConfirm(e)}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button
                            color="error"
                            fullWidth
                            variant="outlined"
                            sx={{ padding: "15px 30px" }}
                            onClick={props.closeHandler}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
        </Grid>
    </>)
}