"use client"
import { ReactElement } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import styles from "./navitem.module.css"

export type NavItemProps = {
	title: string
	icon: ReactElement<SVGElement>
	url?: string
	isOpenMenu: boolean
	onClick?: () => void
}
const NavItem = ({ title, icon, onClick, url = "", isOpenMenu }: NavItemProps) => {
	const pathname = usePathname()
	return (
		<Link
			title={title}
			onClick={onClick}
			href={url}
			className={`flex align-items-center cursor-pointer no-underline ${styles.item}`}
		>
			<div className={`${styles.iconContainer} ${url === pathname ? styles.activeLink : ""}`}>
			{icon}
			</div>
			{isOpenMenu ? <span className={styles.title}>{title}</span> : <></>}
		</Link>
	)
}

export default NavItem
