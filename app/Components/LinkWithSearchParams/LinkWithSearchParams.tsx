import { Link, useLocation } from "react-router";

interface LinkWithSearchParamsProps extends React.ComponentProps<typeof Link> {
	to: string;
	children: React.ReactNode;
}

const LinkWithSearchParams = ({
	to,
	children,
	...props
}: LinkWithSearchParamsProps) => {
	const { search } = useLocation();

	return (
		<Link to={`${to}${search}`} {...props}>
			{children}
		</Link>
	);
};

export default LinkWithSearchParams;
