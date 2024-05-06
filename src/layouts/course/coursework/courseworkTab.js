import {
    Divider,
} from "@mui/material";
import SubmmissionAccordion from "../components/submission_accordion";
import MaterialItem from "../components/material_item";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

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
                        if (Array.isArray(res.data.data)) {
                            let sorted = res.data.data.sort((a, b) => {
                                return a.name > b.name ? 1 : -1
                            })
                            setAssignments(sorted);
                        } else {
                            setAssignments([]);
                        }
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
            </div>
            <br />
            {assignments.length > 0 ? (
                assignments.map((assignment) => {
                    console.log(assignment);
                    return <div style={{
                        marginBottom: '15px'
                    }}>
                        <SubmmissionAccordion
                            refresh={fetchCourseworks}
                            course={props.course}
                            sendToast={props.sendToast}
                            decoded={props.decoded}
                            assignment={assignment}
                        /></div>
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
                <h1 style={{ fontSize: "1.5rem", marginBottom: '10px' }}>Materials</h1>
            </div>
            <div style={{
                justifyContent: 'start',
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '15px'
            }}>
                <SaveAltIcon /><div style={{
                    marginLeft: '10px',
                    marginRight: '40px'
                }}>: File</div>
                <InsertLinkIcon /><div style={{
                    marginLeft: '10px',
                }}>: URL Link</div>
            </div>
            {materials.length > 0 ? (
                materials.map((material) => {
                    return (
                        <MaterialItem material={material} onClick={() => { }} isLecturer={false} />
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
