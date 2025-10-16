import { Link, useLoaderData } from 'react-router';
import Border from '../components/Border.jsx';
import ScrambleText from '../components/ScrambleText.jsx';
import '../styles/projectDetail.css';

export async function clientLoader({ params }) {
  try {
    const response = await fetch('/Portfolio/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    const project = projects[parseInt(params.id)] || projects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === params.id);
    return { project, projects };
  } catch (error) {
    console.error('Failed to load project:', error);
    return { project: null, projects: [] };
  }
}

export default function ProjectDetail() {
  const { project } = useLoaderData();

  if (!project) {
    return (
      <div className="not-found">
        <ScrambleText as="h1">Project Not Found</ScrambleText>
        <Link to="/Portfolio/">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Border activeItem={project} />
      
      <div className="project-header">
        <Link to="/Portfolio/" className="back-link">
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
