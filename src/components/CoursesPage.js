import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

function CousesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then(_courses => setCourses(_courses));
    }, [])

    return (
        <>
            <h2>Curses</h2>
            <Link className="btn btn-primary" to="/course" >Add</Link>
            <CourseList courses={courses} />
        </>
    );
}

export default CousesPage;