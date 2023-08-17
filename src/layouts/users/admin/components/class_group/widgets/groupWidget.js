import { Grid, Button, IconButton, Tooltip, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function GroupWidget(props) {
    return (
        <Grid
            container
            spacing={4}
            style={{ marginBottom: "30px", width: "98.5%" }}>
            <Grid item xs={12}>
                <div className="big-widget">
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', height: '40px', marginBottom: '30px' }}>
                        <h2>Group List</h2>
                        <Tooltip title="Add New Entry">
                            <IconButton
                                onClick={() => {
                                    if (props.handleAddEntry) {
                                        props.handleAddEntry();
                                    } else {
                                        console.log("Add event not binded");
                                    }
                                }}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                    {props.groups.length == 0 ? (
                        <p>Please select programme & term</p>
                    ) : (
                        <Grid container spacing={2}>
                            {props.groups.map((group) => {
                                return (
                                    <Grid
                                        item
                                        xs={2}
                                        sx={{ alignItems: "center" }}>
                                        <Button
                                            fullWidth
                                            sx={{
                                                borderRadius: "10px",
                                                padding: "10px 5px",
                                                backgroundColor: "black",
                                            }}
                                            variant={"contained"}
                                            className="group-chip">
                                            {group.name}
                                        </Button>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}