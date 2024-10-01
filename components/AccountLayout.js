import AccountLink from "./AccountLink";
import Layout from "./Layout";
import OrdersIcon from "./icons/OrdersIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SettingsIcon from "./icons/SettingsIcon";
import WishlistIcon from "./icons/WishlistIcon";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function AccountLayout({ children, title }) {
	const session = useSession();
	return (
		<Layout>
			<div className="p-5 w-full h-full">
				<div className="box w-full box-height sm:h-full flex flex-col sm:flex-row">
					<aside className="h-full rounded-t-lg sm:rounded-l-lg sm:rounded-r-none bg-gray-200 flex justify-center sm:justify-start sm:flex-col gap-3 p-5 whitespace-nowrap">
						<AccountLink
							href="profile"
							title="Profile information"
							Icon={ProfileIcon}
						/>
						<AccountLink href="wishlist" title="Wishlist" Icon={WishlistIcon} />
						<AccountLink
							href="orders"
							title="Order history"
							Icon={OrdersIcon}
						/>
						<AccountLink href="settings" title="Settings" Icon={SettingsIcon} />
					</aside>
					<div className="p-5 w-full">
						<h3>{title}</h3>
						<motion.div
							variants={fadeIn("down", "spring", 0, 1)}
							initial="hidden"
							whileInView="show"
						>
							{session?.status === "authenticated" ? (
								<>{children}</>
							) : (
								<AuthButton />
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
