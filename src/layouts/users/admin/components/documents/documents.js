import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from "@mui/material";
import CustomTable from "../../../../../components/table/table";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import DocumentsForm from "./documentsForm";
import { programmes } from "../../mockData/mock";
import { ToastContainer, toast } from "react-toastify";

function createData(id, name, path, status) {
  return {
    id,
    name,
    path,
    status,
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
    axios.get(process.env.REACT_APP_HOST_URL + "/document").then((res) => {
      if (res.data.status) {
        let data = res.data.data;
        setRowData(data);
        setRows(data);
      } else {
        console.log("Error!");
      }
    });
  };

  const fetchDocuments = (id) => {
    return rows.find((row) => row.id === id);
  };

  const handleEdit = (id) => {
    let document = fetchDocuments(id);
    setDocuments(document);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    setDialogTitle("Delete Documents");
    setDialogContent("This documents will be deleted, are you sure? This change cannot be undone");
    setOpen(true);
    setSelected(index);
    console.log(index);
  };

  const handleDeleteRequest = () => {
    let query = [];
    if (Array.isArray(selected)) {
      query = selected.join("@");
    } else {
      query = selected;
    }

    console.log(query);
    axios.delete(process.env.REACT_APP_HOST_URL + "/documents?id=" + id).then((res) => {
      console.log(res);
      setOpen(false);
    });
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

  const handleDownload = (e) => {
    console.log(e);
  };

  const handleDownloadAll = () => {};

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4} xl={3}>
          <div className="big-widget" style={{ paddingBottom: "25px" }}>
            <h2>Documents Control</h2>
            <p>Manage the documents</p>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Button fullWidth variant="outlined" sx={{ padding: "15px 30px" }} onClick={() => handleDownloadAll()}>
                  Download All
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} md={8} xl={9}>
          <div
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/banner/banner` + 2 + ".jpg)",
              width: "100%",
              height: "225px",
              borderRadius: "10px",
              backgroundSize: "contain",
            }}
          ></div>
        </Grid>
        <Grid item xs={12}>
          <div className="big-widget">
            <div className="campus-list">
              <CustomTable
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
        }}
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteRequest}>Accept</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog className="modal" fullWidth={true} open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <DocumentsForm closeHandler={handleCloseModal} document={documents} refresh={fetchRows} />
        </DialogContent>
      </Dialog>
    </>
  );
}
