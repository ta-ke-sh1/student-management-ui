import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetchCourses = (id) => {
    const [course, setCourse] = useState([]);

    const fetchCourse = async () => {
        const response = await axios.get("");
        if (response && response.data) setCourse(response.data);
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    return { course };
};
