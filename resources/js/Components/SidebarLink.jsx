import { Link } from "@inertiajs/react";
import { ListItem, ListItemButton, ListItemContent } from "@mui/joy";

export default function SidebarLink({ href, icon, children, active=false, ...props }) {
	return (
		<ListItem {...props}>
			{
				active ?
				<ListItemButton selected>
					{icon}
					<ListItemContent>
						<Link href={href}>
							{children}
						</Link>
					</ListItemContent>
				</ListItemButton> : 
				<ListItemButton>
					{icon}
					<ListItemContent>
						<Link href={href}>
							{children}
						</Link>
					</ListItemContent>
				</ListItemButton>
			}
		</ListItem>
	);
}