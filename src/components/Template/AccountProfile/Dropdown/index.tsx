// import { authApi } from "@/services/auth"
import styles from "./Dropdown.module.css"
import { toast } from "react-hot-toast"

export default function AccountProfileDropdown() {

	const handleSignOut = async () => {
		try {
			// await authApi.signOut()
			toast.success("Deslogado!")
		} catch (error) {
			toast.success("Erro ao deslogar")

		}
	}
	return (
		<div className={styles.menu}>
			<div className={styles.arrow} />
			<div className={styles.container}>
				<nav className={styles.nav}>
					<ul>
						{/* <li>
							<a href="">Alterar meus dados</a>
						</li> */}
						<li>
							<a onClick={handleSignOut}>Sair</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}
