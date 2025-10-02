import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import Border from '../components/Border.jsx';
import ScrambleText from '../components/ScrambleText.jsx';
import '../styles/projectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./projects.json')
      .then(res => res.json())
      .then(data => {
        const foundProject = data[parseInt(id)] || data.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === id);
        setProject(foundProject);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="not-found">
        <ScrambleText as="h1">Project Not Found</ScrambleText>
        <Link to="/">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Border />
      
      <div className="project-header">
        <Link to="/" className="back-link">
          ← Back to Portfolio
        </Link>
        <ScrambleText as="h1" className="project-title">
          {project.title}
        </ScrambleText>
      </div>

      <div className="project-content">
        {project.image && (
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>
        )}

        {project.video && (
          <div className="project-video">
            <video controls autoPlay muted loop>
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className="project-description">
          <ScrambleText as="p">
            {project.description}
          </ScrambleText>
        </div>

        {project.technologies && (
          <div className="project-technologies">
            <ScrambleText as="h3">Technologies Used:</ScrambleText>
            <ul>
              {project.technologies.map((tech, index) => (
                <li key={index}>
                  <ScrambleText>{tech}</ScrambleText>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.link && (
          <div className="project-links">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              <ScrambleText>View Project</ScrambleText>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
