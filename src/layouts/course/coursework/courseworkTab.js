import {
    Divider,
    Button,
    Card,
    Typography,
    CardContent,
    CardActionArea,
} from "@mui/material";
import SubmmissionAccordion from "../components/submission_accordion";
import MaterialItem from "../components/material_item";
import { useEffect, useState } from "react";
import axios from "axios";
import { fromMilisecondsToDisplayFormatDateString } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { cacheData } from "../../../utils/dataOptimizer";

export default function CourseworkTab(props) {
    const [assignments, setAssignments] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchCourseworks();
        fetchMaterials();
    }, [props.id]);

    function fetchCourseworks() {
        try {
            axios
                .get(
                    process.env.REACT_APP_HOST_URL +
                    "/course/courseworks?id=" +
                    props.course.id
                )
                .then((res) => {
                    if (res.data.status) {

                        setAssignments(res.data.data);
                        console.log(res.data.data);
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function fetchMaterials() {
        try {
            axios
                .get(
                    process.env.REACT_APP_HOST_URL +
                    "/course/materials?id=" +
                    props.course.id
                )
                .then((res) => {
                    if (res.data.status) {
                        setMaterials(res.data.data);
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    function handleNavigate(index) {
        localStorage.setItem("assignment", JSON.stringify(assignments[index]));
        props.handleSelectTab(3);
    }

    return (
        <>
            <Divider sx={{ margin: "20px 0" }} />
            <div className="row-space-between">
                <h1 style={{ fontSize: "1.5rem" }}>Courseworks</h1>
                {props.decoded.role > 1 ? (
                    <Button onClick={props.handleOpenCourseworkModal}>
                        Add Coursework
                    </Button>
                ) : (
                    <></>
                )}
            </div>
            <br />
            {assignments.length > 0 ? (
                assignments.map((assignment, index) => {
                    console.log(assignment);
                    return props.decoded.role === 1 ? (
                        <SubmmissionAccordion
                            refresh={fetchCourseworks}
                            course={props.course}
                            sendToast={props.sendToast}
                            decoded={props.decoded}
                            assignment={assignment}
                        />
                    ) : (
                        <Card
                            sx={{
                                width: "100%",
                                marginBottom: "20px",
                            }}>
                            <CardActionArea
                                onClick={() => handleNavigate(index)}>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div">
                                        Assigment: {assignment.name} - Deadline:{" "}
                                        {fromMilisecondsToDisplayFormatDateString(
                                            assignment.deadline * 1000
                                        )}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })
            ) : (
                <>
                    <p
                        style={{
                            marginTop: "-10px",
                        }}>
                        Currently, there are no courseworks available for this
                        course.
                    </p>
                </>
            )}
            <Divider sx={{ margin: "20px 0" }} />
            <div className="row-space-between">
                <h1 style={{ fontSize: "1.5rem" }}>Materials</h1>
                {props.decoded.role > 1 ? (
                    <Button onClick={props.handleOpenMaterialModal}>
                        Add Material
                    </Button>
                ) : (
                    <></>
                )}
            </div>
            {materials.length > 0 ? (
                materials.map((material) => {
                    return (
                        <MaterialItem material={material} onClick={() => { }} />
                    );
                })
            ) : (
                <>
                    <p
                        style={{
                            marginTop: "10px",
                        }}>
                        Currently, there are no materials available for this
                        course.
                    </p>
                </>
            )}
            <br />
        </>
    );
}
