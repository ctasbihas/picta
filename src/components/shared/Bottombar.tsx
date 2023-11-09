import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

export default function Bottombar() {
	const { pathname } = useLocation();
	return (
		<section className="bottom-bar">
			{bottombarLinks.map((link) => {
				const isActive = pathname === link.route;
				return (
					<Link
						key={link.label}
						to={link.route}
						className={`${
							isActive && "bg-primary-500"
						} flex-center flex-col gap-1 py-2 px-4 transition rounded-[10px]`}
					>
						<img
							src={link.imgURL}
							alt={link.label}
							className={`${isActive && "invert-white"}`}
							height={20}
							width={20}
						/>
						<p className="tiny-medium text-light-2">{link.label}</p>
					</Link>
				);
			})}
		</section>
	);
}
