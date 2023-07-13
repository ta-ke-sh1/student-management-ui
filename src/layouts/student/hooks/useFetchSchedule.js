import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetchSchedules = () => {
    const [schedule, setSchedule] = useState([]);

    const fetchSchedule = async () => {
        const response = await axios.get("");

        if (response && response.data) setSchedule(response.data);
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    return { schedule };
};
