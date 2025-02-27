import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="flex mt-12 mb-8">
			<div className="flex flex-col gap-1">
				<div className="flex gap-2">
					<a href="https://github.com/spozar" target="_blank" rel="noreferrer">
						<FaGithub size={25} />
					</a>
					<a
						href="https://www.linkedin.com/in/sandro-pozar/"
						target="_blank"
						rel="noreferrer"
					>
						<FaLinkedin size={25} />
					</a>
				</div>
				<p className="text-sm font-thin">© 2025 F1 Helper</p>
			</div>
		</div>
	);
};

export default Footer;
