import React, { useState, useEffect } from "react";
import styles from "./project.module.css";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
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
  id: string;
}

const ProjectDetails: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const updatedProjects: Project[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Project[];
      setProjects(updatedProjects);
    });

    return () => unsubscribe();
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
