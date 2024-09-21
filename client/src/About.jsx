import React, { useState } from "react";
import { Link } from "react-router-dom";
import emmanImage from './assets/emman.jpg';

const teamMembers = [
  {
    name: "Adrian",
    role: "CI/CD Pipeline & Kubernetes Deployment Lead",
    linkedin: "https://www.linkedin.com/in/adrian-profile", 
    image: emmanImage,
  },
  {
    name: "Clarice",
    role: "Logging & Splunk Integration Specialist",
    linkedin: "https://www.linkedin.com/in/clarice-profile",
    image: emmanImage,
  },
  {
    name: "Kharlo",
    role: "Monitoring, Alerting & Grafana Specialist",
    linkedin: "https://www.linkedin.com/in/kharlo-profile",
    image: emmanImage,
  },
  {
    name: "Emman",
    role: "Application Development Lead \n Project Bantay Data Lead",
    linkedin: "https://www.linkedin.com/in/emmanuel-maximo-970a90279/",
    image: emmanImage,
  },
];

const About = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    teamName: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '20px',
      background: 'linear-gradient(to right, black, green)', // Darker colors for light mode
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    },
    teamDescription: {
      fontSize: '18px',
      color: '#666', // Gray color for description
      marginBottom: '40px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'justify', // Justified text
    },
    teamMembers: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    teamMember: {
      margin: '15px',
      textAlign: 'center',
      border: '2px solid gray',
      borderRadius: '10px',
      padding: '20px',
      width: '180px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    memberImage: (isHovered) => ({
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginBottom: '10px',
      objectFit: 'cover',
      boxShadow: isHovered
        ? '0 0 20px 5px rgba(255, 255, 255, 1)' // White shadow on hover
        : '0 0 10px 2px rgba(255, 255, 255, 0.8)', // Regular white shadow
      transition: 'box-shadow 0.3s ease',
    }),
    memberName: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    memberRole: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '10px',
    },
    linkedinLink: {
      color: '#0077b5',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    backLink: {
      display: 'block',
      marginTop: '30px',
      textDecoration: 'none',
      color: '#007bff',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.teamName}>Team Bantay Data</h1>
      <p style={styles.teamDescription}>
        Meet the amazing people behind Bantay Data! Our dedicated team is committed to delivering top-notch monitoring and logging solutions, ensuring data integrity and reliability. Together, we strive to make data management seamless and efficient.
      </p>
      <div style={styles.teamMembers}>
        {teamMembers.map((member) => (
          <div
            style={styles.teamMember}
            key={member.name}
            onMouseEnter={() => setHoveredMember(member.name)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <img
                src={member.image}
                alt={member.name}
                style={styles.memberImage(hoveredMember === member.name)}
              />
              <h2 style={styles.memberName}>{member.name}</h2>
              <p style={styles.memberRole}>{member.role}</p>
              <span style={styles.linkedinLink}>LinkedIn</span>
            </a>
          </div>
        ))}
      </div>
      <Link to="/" style={styles.backLink}>Go back to the home screen</Link>
    </div>
  );
};

export default About;
