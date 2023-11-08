import { Divider, Button, Card, CardHeader, Typography, CardContent, CardActionArea } from "@mui/material"
import SubmmissionAccordion from "./components/submission_accordion"
import MaterialItem from "./components/material_item"
import { useEffect, useState } from "react"
import axios from "axios"
import { fromMilisecondsToDateString, fromMilisecondsToDisplayFormatDateString } from "../../utils/utils"
import { useNavigate } from "react-router-dom"

export default function CourseworkTab(props) {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchCourseworks();
        fetchMaterials();
    }, [])

    function fetchCourseworks() {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/course/courseworks?id=" + props.course.id).then((res) => {
                if (res.data.status) {
                    setAssignments(res.data.data)
                } else {
                    props.sendToast("error", res.data.data)
                }
            });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function fetchMaterials() {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/course/materials?id=" + props.course.id).then((res) => {
                if (res.data.status) {
                    setMaterials(res.data.data)
                } else {
                    props.sendToast("error", res.data.data)
                }
            });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function handleNavigate(index) {
        localStorage.setItem("assignemnt", JSON.stringify(assignments[index]))
        props.handleSelectTab(3);
    }

    return (
        <>
            <Divider sx={{ margin: '20px 0' }} />
            <div className="row-space-between">
                <h1 style={{ fontSize: '1.5rem' }}>Courseworks</h1>
                {props.decoded.role > 1 ? <Button onClick={props.handleOpenCourseworkModal}>Add Coursework</Button> : <></>}
            </div>
            <br />
            {
                assignments && assignments.map((assignment, index) => {
                    return props.decoded.role === 1 ? <SubmmissionAccordion course={props.course} decoded={props.decoded} assignment={assignment} /> :
                        <Card sx={{
                            width: '100%',
                        }}>
                            <CardActionArea onClick={() => handleNavigate(index)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Assigment:{assignment.name} - Deadline:{fromMilisecondsToDisplayFormatDateString(assignment.deadline * 1000)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                })
            }
            <Divider sx={{ margin: '20px 0' }} />
            <div className='row-space-between'>
                <h1 style={{ fontSize: '1.5rem' }}>Materials</h1>
                {props.decoded.role > 1 ? <Button onClick={props.handleOpenMaterialModal}>Add Material</Button> : <></>}
            </div>
            {
                materials && materials.map((material) => {
                    return <MaterialItem material={material} />
                })
            }
            <br />
        </>
    )
}