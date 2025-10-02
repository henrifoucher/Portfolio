import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/projects.json')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            gsap.fromTo(
                '.project-card',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
            );
        }
    }, [projects]);

    return (
        <div className="project-list">
            {projects.map((project, index) => (
                <div key={index} className="project-card" style={{ backgroundColor: project.color }}>
                    <img src={project.image} alt={project.title} />
                    <h2>{project.title}</h2>
                    <p>{project.year}</p>
                    <video controls>
                        <source src={project.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
