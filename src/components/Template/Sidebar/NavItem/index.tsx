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
	const isLastItem = title === "Config" // primary
	const isActive = pathname.startsWith(url);
	return (
		<Link
			title={title}
			onClick={onClick}
			href={url}
			className={`flex align-items-center cursor-pointer no-underline ${styles.item} ${primary ? styles.primaryBorder : ""} ${className} ${primary && isLastItem ? styles.lastItem : ""}`}
		>
			<div className={`${styles.iconContainer} ${isActive ? styles.activeLink : ""} ${primary ? styles.primary : ""}`}>
			{icon}
			</div>
			{isOpenMenu ? <span className={`${styles.title} ${primary ? styles.primary : ""}`}>{title}</span> : <></>}
		</Link>
	)
}

export default NavItem
