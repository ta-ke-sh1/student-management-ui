import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ScheduleForm(props) {
    const [slot, setSlot] = useState("");
    const [class_id, setClassId] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (props.schedule) {
            setSlot(props.schedule.slot);
            setClassId(props.schedule.class);
            setDate(props.schedule.date);
        }
    }, []);

    const handleSubmit = () => {
        axios.post("", {
            slot: slot,
            class_id: class_id,
            date: date,
        });
    };

    return (
        <>
            <div>
                <form action="" method="POST" onSubmit={handleSubmit}></form>
            </div>
        </>
    );
}
