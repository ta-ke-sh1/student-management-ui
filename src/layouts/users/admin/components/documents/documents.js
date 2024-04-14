import { useState, useEffect, useRef } from "react";
import { Button, Grid } from "@mui/material";
import CustomTable from "../../../../../common/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import DocumentsForm from "./documentsForm";
import { ToastContainer, toast } from "react-toastify";
import { fetchDocuments } from "../../../../../utils/utils";

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "Id",
    },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "path",
        numeric: true,
        disablePadding: false,
        label: "Path",
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Status",
    },
];

export default function DocumentsAdmin(props) {
    const tableRef = useRef();
    // Campus documents data
    const [rowData, setRowData] = useState([]);
    const [rows, setRows] = useState([]);

    const [id, setId] = useState("");

    // Selected documents state for editing
    const [documents, setDocuments] = useState({});

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [selected, setSelected] = useState([]);

    const [tableTitle, setTableTitle] = useState("All Documents");

    useEffect(() => {
        fetchRows();
    }, []);

    const fetchRows = () => {
        try {
            axios
                .get(process.env.REACT_APP_HOST_URL + "/document")
                .then((res) => {
                    if (res.data.status) {
                        let data = res.data.data;
                        setRowData(data);
                        setRows(data);
                        toast.success("Data Fetched Succesfully", {
                            position: "bottom-left",
                        });
                    } else {
                        console.log("Error!");
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleEdit = (id) => {
        try {
            let document = fetchDocuments(rows, id);
            setDocuments(document);
            setOpenModal(true);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleDelete = (index) => {
        try {
            setDialogTitle("Delete Documents");
            setDialogContent(
                "This documents will be deleted, are you sure? This change cannot be undone"
            );
            setOpen(true);
            setSelected(index);
            console.log(index);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleDeleteRequest = () => {
        try {
            let query = [];
            if (Array.isArray(selected)) {
                query = selected.join("@");
            } else {
                query = selected;
            }

            console.log(query);
            axios
                .delete(process.env.REACT_APP_HOST_URL + "/document?id=" + id)
                .then((res) => {
                    console.log(res);
                    setOpen(false);
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenModal = () => {
        setDocuments({});
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDownload = async (e) => {
        try {
            const document = fetchDocuments(rows, e);
            window.open(process.env.REACT_APP_HOST_URL + document.path);
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleDownloadAll = () => {
        try {
            window.open(
                process.env.REACT_APP_HOST_URL + "/documents/documents.rar"
            );
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm={12} md={4} xl={3}>
                    <div
                        className="big-widget"
                        style={{ paddingBottom: "25px" }}>
                        <h2>Documents Control</h2>
                        <p>Manage the documents</p>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ padding: "15px 30px" }}
                                    onClick={() => handleDownloadAll()}>
                                    Download All
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item sm={12} md={8} xl={9}>
                    <div
                        style={{
                            backgroundImage:
                                `url(${process.env.PUBLIC_URL}/banner/banner` +
                                2 +
                                ".jpg)",
                            width: "100%",
                            height: "225px",
                            borderRadius: "10px",
                            backgroundSize: "contain",
                        }}></div>
                </Grid>
                <Grid item xs={12}>
                    <div className="big-widget">
                        <div className="campus-list">
                            <CustomTable
                                ref={tableRef}
                                handleRefreshEntry={fetchRows}
                                handleAddEntry={() => {
                                    handleOpenModal();
                                }}
                                title={tableTitle}
                                rows={rows}
                                headCells={headCells}
                                colNames={["id", "name", "path", "status"]}
                                isDownloadable={true}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleDownload={handleDownload}
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
                    zIndex: 100000,
                }}>
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteRequest}>Accept</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                className="modal"
                fullWidth={true}
                open={openModal}
                onClose={() => setOpenModal(false)}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}>
                    <DocumentsForm
                        closeHandler={handleCloseModal}
                        document={documents}
                        refresh={fetchRows}
                    />
                </DialogContent>
            </Dialog>

            <ToastContainer />
        </>
    );
}
