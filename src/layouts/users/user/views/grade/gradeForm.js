import { Button, Grid, TextareaAutosize } from "@mui/material";
import axios from "axios";

export default function GradingTab(props) {
  const [formData, setFormData] = useState({
    gradeNumber: props.submission.gradeNumber ?? 0,
    gradeText: props.submission.gradeText ?? "P",
  });

  function handleSubmitGrade() {
    try {
      axios.post(process.env.REACT_APP_HOST_URL + "/").then((res) => {});
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  function handleCancel() {}

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <TextareaAutosize value={formData.comments} label={"Comments"}></TextareaAutosize>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField onChange={handleChange} value={formData.gradeNumber} id="form-grade-number" fullWidth label="Grade Number" name={"gradeNumber"} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="grade-text-grade-select-label-form">Grade Text</InputLabel>
            <Select
              name={"gradeText"}
              defaultValue={formData.gradeText ?? "P"}
              value={formData.gradeText ?? "P"}
              label="Grade Text"
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: (e) => {
                  e.preventDefault();
                },
              }}
              onChange={handleChange}
            >
              <MenuItem value={"default"} disabled>
                Select a Grade
              </MenuItem>
              {constants.grades.map((grade) => (
                <MenuItem key={grade.id} value={grade.id}>
                  {grade.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button onClick={handleSubmitGrade}>Submit</Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button onClick={handleCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </>
  );
}
