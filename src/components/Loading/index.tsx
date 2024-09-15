"use client"
import React, { useEffect } from "react"

import styles from "./Loading.module.css"

const Loading = () => {
	useEffect(() => {
		const document = window.document.getElementById("layout-container") as HTMLElement
		document.style.overflow = "hidden"
		return () => {
			document.style.overflow = "auto"
		}
	}, [])
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.spinner} />
		</div>
	)
}

export default Loading
