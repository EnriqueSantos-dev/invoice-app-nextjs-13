import Link, { LinkProps } from "next/link";
import { BiChevronLeft } from "react-icons/bi";

interface LinkGoBackProps extends LinkProps {}

export function LinkGoBack(props: LinkGoBackProps) {
	return (
		<Link
			className="flex items-center gap-3 text-sm font-bold text-black dark:text-white md:text-base"
			{...props}
		>
			<BiChevronLeft className="h-4 w-4 fill-purple font-bold" />
			Go back
		</Link>
	);
}
