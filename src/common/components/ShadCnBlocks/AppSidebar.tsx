import * as React from 'react';
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react';
import { NavMain } from '@/common/components/ShadCnBlocks/NavMain';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/shadcn/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '/app/',
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: 'Employees',
			url: '/app/employees/',
			icon: Bot,
		},
	],
};

// NOTE: I did not write this component. It came with the Shadcn layout blocks.

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<div className='flex items-center gap-2'>
					<Avatar>
						<AvatarImage src='/cyberpunk-avatar-cropped.jpg' />
						<AvatarFallback>CP</AvatarFallback>
					</Avatar>
					<h1 className='text-md font-semibold text-gray-600 group-data-[collapsible=icon]:hidden'>
						Hire Chris Inc.
					</h1>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};
