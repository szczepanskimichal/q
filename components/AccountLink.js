import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLink({ href, title, Icon }) {
	const pathname = usePathname();

	return (
		<Link href={`/account/${href}`}>
			<button
				className={`w-full bg-white ${
					pathname.includes(href) ? "text-primary" : "text-secondary"
				}`}
			>
				<Icon />
				<span className="hidden md:flex">{title}</span>
			</button>
		</Link>
	);
}
