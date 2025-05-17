import { type LucideIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Collapsible } from '@/shadcn-components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/shadcn-components/ui/sidebar';

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className='group/collapsible'
					>
						<SidebarMenuItem>
							{/* <CollapsibleTrigger asChild> */}
							<Link to={item.url}>
								<SidebarMenuButton
									tooltip={item.title}
									className='cursor-pointer'
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</Link>
							{/* </CollapsibleTrigger> */}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
