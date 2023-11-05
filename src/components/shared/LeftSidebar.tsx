import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

export default function LeftSidebar() {
	const { user } = useUserContext();
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess, navigate]);

	return (
		<nav className="leftsidebar">
			<div className="flex flex-col gap-11">
				<Link
					to="/"
					className="flex gap-3 items-center"
				>
					<img
						src="/assets/images/logo.svg"
						alt="Logo"
						width={170}
						height={36}
					/>
				</Link>
				<Link
					to={`/profile/${user.username}`}
					className="flex gap-3 items-center"
				>
					<img
						src={user.imageUrl || "/assets/images/profile.png"}
						alt="Profile"
						className="h-14 w-14 rounded-full"
					/>
					<div className="flex flex-col">
						<p className="body-bold">{user.name}</p>
						<p className="small-regular text-light-3">
							@{user.username}
						</p>
					</div>
				</Link>
				<ul className="flex flex-col gap-6">
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route;
						return (
							<li
								key={link.label}
								className={`leftsidebar-link group ${
									isActive && "bg-primary-500"
								}`}
							>
								<NavLink
									to={link.route}
									className="flex gap-4 items-center p-4"
								>
									<img
										src={link.imgURL}
										alt={link.label}
										className={`group-hover:invert-white ${
											isActive && "invert-white"
										}`}
									/>
									{link.label}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<Button
				onClick={() => signOut()}
				variant="ghost"
				className="shad-button_ghost"
			>
				<img
					src="/assets/icons/logout.svg"
					alt="Logout"
				/>
				<p className="small-medium lg:base-medium">Logout</p>
			</Button>
		</nav>
	);
}
