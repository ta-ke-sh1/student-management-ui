import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPersonal = () => {
    const [student, setStudent] = useState({
        username: "",
        password: "",
        class: "",
    });

    const fetchStudent = async () => {
        const response = await axios.get("");

        if (response && response.data) setStudent(response.data);
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    return { student };
};
