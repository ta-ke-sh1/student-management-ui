export const items = {
    Subjects: "subjectData",
    Attendances: "attendancesData",
    Groups: "groupsData",
    Users: "usersData",
    Lecturers: "lecturersData",
    Rooms: "roomsData",
    Registration: "registrationData"
}

// Cache data for less database requests
export const cacheData = (item, data) => {
    localStorage.setItem(item, JSON.stringify(data))
}

export const getCache = (item) => {
    let cacheData = localStorage.getItem(item)
    return JSON.parse(cacheData)
}

export const getArrayCache = (item) => {
    let cacheData = JSON.parse(localStorage.getItem(item))
    if (Array.isArray(cacheData)) {
        return cacheData
    } else {
        return []
    }
}

export const getCacheData = (item, fn) => {
    let cacheData = JSON.parse(localStorage.getItem(item))
    if (Array.isArray(cacheData)) {
        return cacheData
    } else if (fn) {
        fn();
    }
}