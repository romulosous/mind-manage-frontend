"use client"
import { ReactElement } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import styles from "./navitem.module.css"

export type NavItemProps = {
	title: string
	icon: ReactElement<SVGElement>
	url?: string
	isOpenMenu?: boolean
	primary?: boolean
	onClick?: () => void
	className?: string
}
const NavItem = ({ title, icon, onClick, url = "", isOpenMenu, className = "", primary }: NavItemProps) => {
	const pathname = usePathname()
	return (
		<Link
			title={title}
			onClick={onClick}
			href={url}
			className={`flex align-items-center cursor-pointer no-underline ${styles.item} ${primary ? styles.primaryBorder : ""} ${className}`}
		>
			<div className={`${styles.iconContainer} ${url === pathname ? styles.activeLink : ""}`}>
			{icon}
			</div>
			{isOpenMenu ? <span className={`${styles.title} ${primary ? styles.primary : ""}`}>{title}</span> : <></>}
		</Link>
	)
}

export default NavItem
