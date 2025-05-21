import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppSidebar } from '@/common/components/ShadCnBlocks';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from '@/shadcn/ui/breadcrumb';
import { Separator } from '@/shadcn/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shadcn/ui/sidebar';
import { DarkModeToggle } from '@/common/components';

export const Route = createFileRoute('/_app')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center justify-between w-full px-4'>
						<div className='flex items-center gap-2'>
							<SidebarTrigger className='-ml-1' />
							<Separator orientation='vertical' className='mr-2 h-4' />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className='hidden md:block'>
										<BreadcrumbLink href='#'>
											Employee Benefits Calculator
										</BreadcrumbLink>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
						<DarkModeToggle />
					</div>
				</header>
				<div className='pl-10 pr-10 p-4'>
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
