import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import DownloadIcon from "@mui/icons-material/Download"

export default function EnhancedTableToolbar(props) {
    const { numSelected, selected, title } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div">
                    {title}
                </Typography>
            )}

            {numSelected === 0 ? (
                <>
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
                </>
            ) : numSelected === 1 ? (
                <>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => props.handleEdit(selected[0])}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => props.handleDelete(selected[0])}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    {
                        props.isCampusControl ?
                            <>
                                <Tooltip title="View Students List">
                                    <IconButton onClick={() => props.handleSearchStudents(selected[0])}>
                                        <PeopleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="View Schedules">
                                    <IconButton onClick={() => props.handleSearchSchedules(selected[0])}>
                                        <DateRangeIcon />
                                    </IconButton>
                                </Tooltip>
                            </> : <></>
                    }{
                        props.isDownloadable ?
                            <>
                                <Tooltip>
                                    <IconButton onClick={() => props.handleDownload(selected[0])}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            </> : <></>
                    }
                </>
            ) : (
                <Tooltip title="Delete">
                    <IconButton onClick={() => props.handleDelete(selected)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
