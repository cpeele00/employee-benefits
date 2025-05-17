import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

// NOTE: I did not write this particular hook. It came with the Shadcn layout blocks.

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener('change', onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener('change', onChange);
	}, []);

	return !!isMobile;
}
