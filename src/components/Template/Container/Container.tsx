import styles from "./Container.module.css"

interface ContainerProps {
	children: React.ReactNode
	className?: string
}

const Container = ({ children, className = "" }: ContainerProps) => {
	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.warp}>{children}</div>
		</div>
	)
}

export default Container
