import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Border from './Border.jsx';
import ScrambleText from './ScrambleText.jsx';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        // Find project by ID (index) or by title slug
        const foundProject = data[parseInt(projectId)] ||
          data.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === projectId);
        setProject(foundProject);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch project:', err);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="not-found">
        <ScrambleText as="h1">Project Not Found</ScrambleText>
        <ScrambleText as={Link} to="/" className="back-button">← Back to Projects</ScrambleText>
      </div>
    );
  }

  const isVideo = project.video && !project.video.endsWith('.png');

  return (
    <Border activeItem={project}>
      <div className="project-detail">
        <nav className="project-nav">
          <ScrambleText as={Link} to="/" className="back-button">← Back to Projects</ScrambleText>
        </nav>
        <div className="project-content">
          <div className="project-media">
            {isVideo ? (
              <video
                src={project.video}
                controls
                autoPlay
                muted
                loop
                preload="auto"
                playsInline
                className="project-video"
                style={{
                  imageRendering: 'high-quality'
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            )}
          </div>

          <div className="project-info">
            <div className="project-header">
              <ScrambleText as="h1" className="project-title" duration={1.0}>
                {project.title}
              </ScrambleText>
              <div className="project-meta">
                <ScrambleText as="span" className="project-year">
                  {project.year}
                </ScrambleText>
                <ScrambleText as="span" className="project-class">
                  {project.class}
                </ScrambleText>
              </div>
            </div>

            <div className="project-description">
              <ScrambleText as="p" duration={1.2}>
                {project.description}
              </ScrambleText>
            </div>

            {project.link && (
              <div className="project-links">
                <ScrambleText 
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                  duration={0.6}
                >
                  View Project ↗
                </ScrambleText>
              </div>
            )}
          </div>
        </div>
      </div>
    </Border>
  );
}

export default ProjectDetail;