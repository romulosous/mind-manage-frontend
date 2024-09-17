"use client"
import React from "react";
import styles from "./patientDetails.module.css";
import PatientSidebar from "./Sidebar";


export default function patientDetails() {
  return (
    <div className={styles.container}>
        <PatientSidebar />
    </div>
  );
}
