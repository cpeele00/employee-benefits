import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/app/benefits/')({
	component: BenefitsRoute,
});

function BenefitsRoute() {
	return <div>Hello "/_app/app/benefits/"!</div>;
}
