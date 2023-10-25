import { Grid, FormControl, Box, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function ScheduleSearch(props) {
  const [group, setGroup] = useState("");
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("default");
  const [searchType, setSearchType] = useState(0);

  const searchTypes = [
    {
      index: 0,
      id: "Campus",
    },
    {
      index: 1,
      id: "Name",
    },
    {
      index: 2,
      id: "Group",
    },
  ];

  const handleChangeParams = (e) => {
    setCampus("default");
    setGroup("");
    setName("");
    setSearchType(e.target.value);
  };

  const handleCampusChange = (e) => {
    setCampus(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const searchComponents = [<SearchDropdownCampus campus={campus} handleChange={handleCampusChange} />, <SearchFieldName name={name} handleChange={handleNameChange} />, <SearchFieldGroup group={group} handleChange={handleGroupChange} />];

  const handleSearch = () => {
    let query;
    switch (searchType) {
      case 0:
        query = campus;
        break;
      case 1:
        query = name;
        break;
      case 2:
        query = group;
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

function SearchDropdownCampus(props) {
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
      <Grid item xs={12} md={12}>
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
      </Grid>
    </>
  );
}

function SearchFieldName(props) {
  return (
    <Grid item xs={12} md={12}>
      <TextField onChange={props.handleChange} value={props.name ?? ""} id="form-name" fullWidth label="Name" variant="standard" />
    </Grid>
  );
}

function SearchFieldGroup(props) {
  return (
    <Grid item xs={12} md={12}>
      <TextField onChange={props.handleChange} value={props.group ?? ""} id="form-name" fullWidth label="Group" variant="standard" />
    </Grid>
  );
}
