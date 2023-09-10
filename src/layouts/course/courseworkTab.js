import { Divider, Button } from "@mui/material"
import SubmmissionAccordion from "./components/submission_accordion"
import MaterialItem from "./components/material_item"


export default function CourseworkTab(props) {
    return (
        <>
            <p>
                This site will provide you all the key information and learning resources for this module. Please ensure you familiarise yourself with the University of Greenwich Vietnam's Handbook where you will find all the information regarding the module, weekly schedule, assessments and more.
                If you have any questions or no content is being shown in this CMS Page, please get in touch with your lecturer in the first instance. Alternatively, you may wish to contact your Programme Leader or Head of Department/School.
            </p>
            <p>
                If you experience technical difficulties please visit: https://www.gre.ac.uk/it-and-library
            </p>
            <Divider sx={{ margin: '20px 0' }} />
            <div className="row-space-between">
                <h1 style={{ fontSize: '1.5rem' }}>Courseworks</h1>
                {props.decoded.role > 1 ? <Button onClick={props.handleOpenCourseworkModal}>Add Coursework</Button> : <></>}
            </div>
            <br />
            {
                props.course.assignment && props.course.assignment.map((assignment) => {
                    return <SubmmissionAccordion assignment={assignment} />
                })
            }
            <Divider sx={{ margin: '20px 0' }} />
            <div className='row-space-between'>
                <h1 style={{ fontSize: '1.5rem' }}>Materials</h1>
                {props.decoded.role > 1 ? <Button onClick={props.handleOpenMaterialModal}>Add Material</Button> : <></>}
            </div>
            {
                props.course.materials && props.course.materials.map((material) => {
                    return <MaterialItem material={material} />
                })
            }
            <br />
        </>
    )
}