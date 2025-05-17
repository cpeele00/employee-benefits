import { createFileRoute, Outlet, useMatch, useMatches } from '@tanstack/react-router';
import { AppSidebar } from '@/common/components/ShadCnBlocks';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/common/shadcn/ui/breadcrumb';
import { Separator } from '@/common/shadcn/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/common/shadcn/ui/sidebar';

export const Route = createFileRoute('/_app')({
	component: RouteComponent,
});

function RouteComponent() {
	const matches = useMatches();
	const pathname = matches[matches.length - 1]?.pathname;
	const lastSegment = pathname?.split('/').filter(Boolean).pop() || '';
	const currentPageName =
		lastSegment === 'app' ? 'Dashboard' : lastSegment || 'Dashboard';

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator orientation='vertical' className='mr-2 h-4' />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className='hidden md:block'>
									<BreadcrumbLink href='#'>
										Employee Benefits Calculator
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className='hidden md:block' />
								<BreadcrumbItem>
									<BreadcrumbPage className='font-semibold capitalize'>
										{currentPageName}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
