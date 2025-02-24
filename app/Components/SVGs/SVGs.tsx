export const Expanded = ({
	className = "",
	width = 10,
	height = 10,
	fill = "white",
	...props
}) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
		width={width}
		height={height}
		{...props}
	>
		<title>Expanded</title>
		<path
			fill={fill}
			d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
		/>
	</svg>
);

export const NotExpanded = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 448"
		width="10"
		height="10"
	>
		<title>Not exapnded</title>
		<path
			fill="white"
			d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 
        9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 
        256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 
        24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
		/>
	</svg>
);
