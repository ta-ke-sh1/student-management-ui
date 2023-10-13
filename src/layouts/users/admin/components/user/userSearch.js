import { Grid, FormControl, Box, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function UserSearch(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(dayjs(new Date()));
  const [phone, setPhone] = useState("+84");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const [searchType, setSearchType] = useState(0);

  const searchTypes = [
    {
      index: 0,
      id: "Id",
    },
    {
      index: 1,
      id: "Name",
    },
    {
      index: 2,
      id: "Date of Birth",
    },
    {
      index: 3,
      id: "Phone",
    },
    {
      index: 4,
      id: "Address",
    },
    {
      index: 5,
      id: "Department",
    },
  ];

  const handleChangeParams = (e) => {
    setCampus("default");
    setGroup("");
    setName("");
    setSearchType(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setCampus(e.target.value);
  };

  const handleAddressChange = (e) => {
    setGroup(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setName(e.target.value);
  };

  const searchComponents = [<SearchDropdownDepartment campus={campus} handleChange={handleCampusChange} />, <SearchFieldName name={name} handleChange={handleNameChange} />, <SearchFieldGroup group={group} handleChange={handleGroupChange} />];

  const handleSearch = () => {
    let query;
    switch (searchType) {
      case 0:
        query = campus;
        break;
      case 1:
        query = dob;
        break;
      case 2:
        query = group;
      case 3:
        query = phone;
        break;
      case 4:
        query = address;
        break;
      case 5:
        query = department;
        break;
      case 6:
        query = email;
        break;
      default:
        break;
    }

    console.log("Query is: ");
    console.log(query);
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={4} md={2} sx={{ display: "flex" }}>
                <Box sx={{ marginTop: "20px", marginRight: "10px" }}>
                  <SearchIcon />
                </Box>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="campus-select-label-form">Search Type</InputLabel>
                  <Select
                    defaultValue={searchType ?? 0}
                    value={searchType ?? 0}
                    label="Search Type"
                    MenuProps={{
                      disablePortal: true, // <--- HERE
                      onClick: (e) => {
                        e.preventDefault();
                      },
                    }}
                    onChange={(e) => {
                      handleChangeParams(e);
                    }}
                  >
                    {searchTypes.map((campus) => (
                      <MenuItem key={"Search-" + campus.id} value={campus.index}>
                        {campus.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} md={10}>
                {searchComponents[searchType]}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                handleSearch();
              }}
              sx={{ padding: "15px 30px" }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined" color="error" fullWidth sx={{ padding: "15px 30px" }} onClick={props.closeHandler}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

function SearchDropdownDepartment(props) {
  const [campus, setCampus] = useState("");

  let campuses = [
    {
      id: "HN",
      name: "Ha Noi",
    },
    {
      id: "HCM",
      name: "Ho Chi Minh",
    },
    {
      id: "DN",
      name: "Da Nang",
    },
    {
      id: "CT",
      name: "Can Tho",
    },
  ];

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="campus-select-label-form">Campus</InputLabel>
        <Select
          defaultValue={props.campus ?? "HN"}
          value={props.campus ?? "default"}
          label="Campus"
          MenuProps={{
            disablePortal: true, // <--- HERE
            onClick: (e) => {
              e.preventDefault();
            },
          }}
          onChange={props.handleChange}
        >
          <MenuItem value={"default"} disabled>
            Please select a Campus
          </MenuItem>
          {campuses.map((campus) => (
            <MenuItem key={campus.id} value={campus.id}>
              {campus.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

function SearchFieldName(props) {
  return <TextField onChange={props.handleChange} value={props.name ?? ""} id="form-name" fullWidth label="Name" variant="standard" />;
}

function SearchFieldGroup(props) {
  return <TextField onChange={props.handleChange} value={props.group ?? ""} id="form-name" fullWidth label="Group" variant="standard" />;
}

function SearchField(props) {}

function SearchFieldName(props) {
  return <TextField onChange={props.handleChange} value={props.name ?? ""} id="form-name" fullWidth label="Name" variant="standard" />;
}

function SearchFieldGroup(props) {
  return <TextField onChange={props.handleChange} value={props.group ?? ""} id="form-name" fullWidth label="Group" variant="standard" />;
}
