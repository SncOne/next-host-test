import React, { useState, useEffect } from "react";
import styles from "./project.module.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCk_lvvum1PUtmSU3CRxgrp3yexfVlQ5iI",
  authDomain: "next-host-test.firebaseapp.com",
  projectId: "next-host-test",
  storageBucket: "next-host-test",
  messagingSenderId: "586141810520",
  appId: "1:586141810520:web:ce2aca61db43630afe6f2d",
  measurementId: "G-84M0XCFBJ8",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Project {
  image: string;
  name: string;
  description: string;
  link: string;
}

const ProjectDetails: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const projectsCollection = collection(db, "projects");
    const projectSnapshot = await getDocs(projectsCollection);
    const projectList = projectSnapshot.docs.map(
      (doc) => doc.data() as Project
    );
    return projectList;
  };

  const getProjects = async () => {
    const projectsData = await fetchProjects();
    console.log("Fetched Projects:", projectsData);
    setProjects(projectsData);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={styles.projectList}>
      {projects.map((project, index) => (
        <div key={index} className={styles.projectCard}>
          <img
            src={project.image}
            alt={`Project ${index + 1} Thumbnail`}
            className={styles.projectImage}
          />
          <div className={styles.projectContent}>
            <p className={styles.projectText}>{project.name}</p>
            <p className={styles.projectText}>{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              GitHub Link
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
