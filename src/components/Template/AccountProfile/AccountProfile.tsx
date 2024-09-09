
import { motion } from "framer-motion"

import AccountProfileDropdown from "./Dropdown"

import styles from "./AccountProfile.module.css"
import { useContext } from "react"
// import { Context } from "@/context/AuthContext"

interface AccountProfileProps {
	isOpenMenu: boolean
	isOpenDropdown: boolean
	onClick(): void
}

const AccountProfile = ({ isOpenMenu, onClick, isOpenDropdown }: AccountProfileProps) => {
	// const authContext = useContext(Context)
	// const user = authContext?.user
	const user = {
		displayName: "User"
	}
	const show = {
		opacity: 1,
		display: "block",
		transition: { duration: 0.1, ease: "backIn" },
	}

	const hide = {
		opacity: 0,
		scale: 0.8,
		transition: { duration: isOpenMenu ? 0.2 : 0.2, ease: "easeIn" },
		transitionEnd: {
			display: "none",
		},
	}

	function getInitials(fullName: string) {
		const nameParts = fullName.split(' ');
		let initials = '';

		// Get the initial of the first name
		if (nameParts.length > 0) {
			initials += nameParts[0].charAt(0).toUpperCase();
		}

		// Get the initial of the next last name, if any
		if (nameParts.length > 1) {
			initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
		}

		return initials;
	}


	return (
		<div className={styles.accountProfile}>
			<motion.button
				className={styles.profile}
				whileTap={{ scale: 0.85 }}
				onClick={onClick}
			>
				<div className={styles.circle}>
					<p>{getInitials(user?.displayName || "")}</p>
				</div>
				<motion.svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={styles.profileArrow}
					animate={{
						rotate: isOpenDropdown ? -180 : 0,
					}}
				>
					<path
						d="M1.92001 4.63333C2.08667 4.46666 2.28401 4.38333 2.51201 4.38333C2.73956 4.38333 2.93667 4.46666 3.10334 4.63333L7.98667 9.51666L12.8867 4.61666C13.0422 4.46111 13.2367 4.38333 13.47 4.38333C13.7033 4.38333 13.9033 4.46666 14.07 4.63333C14.2367 4.8 14.32 4.99733 14.32 5.22533C14.32 5.45289 14.2367 5.65 14.07 5.81666L8.45334 11.4167C8.38667 11.4833 8.31445 11.5307 8.23667 11.5587C8.1589 11.5862 8.07556 11.6 7.98667 11.6C7.89778 11.6 7.81445 11.5862 7.73667 11.5587C7.6589 11.5307 7.58667 11.4833 7.52001 11.4167L1.90334 5.8C1.74778 5.64444 1.67001 5.45289 1.67001 5.22533C1.67001 4.99733 1.75334 4.8 1.92001 4.63333Z"
						fill="#FFFFFF"
					/>
				</motion.svg>
			</motion.button>
			<motion.div
				className={styles.dropdown}
				initial={{ display: "none" }}
				animate={isOpenDropdown ? show : hide}
				style={{ pointerEvents: isOpenDropdown ? "auto" : "none" }}
			>
				<AccountProfileDropdown />
			</motion.div>
		</div>
	)
}

export default AccountProfile
