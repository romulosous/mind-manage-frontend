import styles from "./Container.module.css"

interface ContainerProps {
	children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
	return (
		<div className={styles.container} id="layout-container">
			<div className={styles.warp}>{children}</div>
		</div>
	)
}

export default Container
