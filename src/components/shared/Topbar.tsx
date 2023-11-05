import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

export default function Topbar() {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	const { user } = useUserContext();

	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);
	console.log(user);
	return (
		<section className="topbar">
			<div className="flex-between py-4 px-5">
				<Link
					to="/"
					className="flex gap-3 items-center"
				>
					<img
						src="/assets/images/logo.svg"
						alt="Logo"
						width={130}
						height={325}
					/>
				</Link>
				<div className="flex gap-4">
					<Button
						onClick={() => signOut()}
						variant="ghost"
						className="shad-button_ghost"
					>
						<img
							src="/assets/icons/logout.svg"
							alt="Logout"
						/>
					</Button>
					<Link
						to={`/profile/${user.username}`}
						className="flex-center gap-3"
					>
						<img
							src={user?.imageUrl || "/assets/images/profile.png"}
							alt="Avatar"
							className="h-8 w-8 rounded-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
}