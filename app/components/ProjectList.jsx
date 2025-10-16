import { useEffect, useState } from 'react';
import gsap from 'gsap';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const base = import.meta.env.BASE_URL || '/';
        fetch(`${base}projects.json`)
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
                    <img src={project.image && (project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL || '/'}${project.image.replace(/^\/+/, '')}`)} alt={project.title} />
                    <h2>{project.title}</h2>
                    <p>{project.year}</p>
                    <img src={project.cover && (project.cover.startsWith('http') ? project.cover : `${import.meta.env.BASE_URL || '/'}${project.cover.replace(/^\/+/, '')}`)} alt={`${project.title} cover`} className="project-cover" />
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
