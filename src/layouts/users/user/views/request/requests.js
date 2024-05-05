import { useState, useEffect } from "react";
import { Button, Grid, Card, CardMedia, CardContent, Box, Divider } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import axios from "axios";
import RequestsForm from "./requestForm";
import { ToastContainer } from "react-toastify";
import { downloadFile, fromMilisecondsToDisplayFormatDateString } from "../../../../../utils/utils";

import { decodeToken } from "../../../../../utils/utils";

export default function RequestsTab(props) {
    const token = decodeToken(localStorage.getItem("access_token"));
    // Campus requests data
    const [rows, setRows] = useState([]);

    // Selected requests state for editing
    const [request, setRequest] = useState({});

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchRows();
        console.log(token)

        return function cleanUp() {
            localStorage.removeItem("requestsData");
        }
    }, []);

    const fetchRows = () => {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/request/user?id=" + token.id).then((res) => {
                if (!res.data.status) {
                    props.sendToast("error", res.data.data);
                } else {
                    let data = [];
                    res.data.data.forEach((request) => {
                        data.push(request);
                    });
                    setRows(data);
                    console.log(data);
                    localStorage.setItem("requestsData", JSON.stringify(data));
                }
            });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const normalizeIndex = (index) => {
        const limit = 5;
        return index > limit ? (index % (limit + 1)) + 1 : index;
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item sm={12}>
                    <h2
                        className="bold"
                        style={{
                            fontSize: "1.75rem",
                            marginBottom: 10
                        }}
                    >
                        Requests
                    </h2>
                    <p>
                        This request will be submitted to Department of Academic Affairs. <br />
                        You are required to attach supporting documents (if any) before submitting any request
                    </p>
                    <div className="date-row" style={{
                        marginBottom: 20
                    }}>
                        <Button variant="outlined" sx={{ marginRight: '20px' }} onClick={() => {
                            downloadFile(process.env.REACT_APP_HOST_URL + "/documents/documents.rar", 'documents.rar');
                        }}>
                            Download All Templates
                        </Button>
                        <Button variant="outlined" onClick={() => {
                            setOpenModal(true)
                        }}>
                            Add Request
                        </Button>
                    </div>

                    <Divider />
                    <p>
                        All your requested requests are listed here.
                    </p>
                </Grid>
                <Grid item xs={12}>
                    {
                        rows && rows.length > 0 ?
                            rows.map((request, index) => {
                                return (
                                    <>
                                        <Card sx={{
                                            display: "flex",
                                        }}>
                                            <CardMedia sx={{
                                                width: "150px",
                                                backgroundImage:
                                                    `url(${process.env.PUBLIC_URL}/banner/banner` +
                                                    normalizeIndex(index + 1) +
                                                    ".jpg)",
                                            }}>
                                            </CardMedia>
                                            <CardContent sx={{
                                                padding: "20px",
                                                flex: "1 0 auto",
                                            }}>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>
                                                        <strong style={{ marginRight: '10px' }}>Id: </strong>  {request.id}
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <strong style={{ marginRight: '10px' }}>Date:</strong> {fromMilisecondsToDisplayFormatDateString(new Date(request.date))}
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Box display="flex" justifyContent="flex-end">
                                                            <strong style={{ marginRight: '10px' }}>Type:</strong> {request.request_type}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item justify="flex-end" xs={4}>
                                                        <Box display="flex" justifyContent="flex-end">
                                                            <strong style={{ marginRight: '10px' }}>Status:</strong> {request.status === -1 ?
                                                                "Processing"
                                                                : request.status === 0 ?
                                                                    <span style={{ color: 'red' }}>Rejected</span> :
                                                                    <span style={{ color: 'green' }}>Accepeted</span>}
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </>
                                )
                            }) : <>
                                <p>You do not have any pending requests yet.</p>
                            </>
                    }

                </Grid>
            </Grid>
            <Dialog className="modal" fullWidth={true} open={openModal} onClose={() => setOpenModal(false)}>
                <DialogContent
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 12,
                    }}
                >
                    <RequestsForm closeHandler={handleCloseModal} request={request} refresh={fetchRows} userRole={1} user={token} />
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </>
    );
}
