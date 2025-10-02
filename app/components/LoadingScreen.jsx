import React from 'react';
import '../styles/loadingscreen.css';

const LoadingScreen = ({ progress = 0 }) => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <svg 
          className="loading-spinner" 
          viewBox="0 0 58 58" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(2 1)" stroke="currentColor" strokeWidth="1.5">
              <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="1;0;0;0;0;0;0;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;1;0;0;0;0;0;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;0;1;0;0;0;0;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;0;0;1;0;0;0;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;0;0;0;1;0;0;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;0;0;0;0;1;0;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;0;0;0;0;0;1;0" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="27" cy="5" r="5" fillOpacity="0" fill="currentColor">
                <animate 
                  attributeName="fill-opacity" 
                  begin="0s" 
                  dur="1.3s" 
                  values="0;0;0;0;0;0;0;1" 
                  calcMode="linear" 
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
        <p className="loading-text">Loading...</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <p className="progress-text">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;