import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type: React.HTMLInputTypeAttribute;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	({ ...rest }, ref) => {
		return (
			<input
				{...rest}
				ref={ref}
				className="h-11 w-full rounded bg-white px-3 text-vulcan outline-none ring-1 ring-selago transition-all focus:ring-purple disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-70 hover:ring-purple disabled:hover:ring-selago dark:border-0 dark:bg-ebony dark:text-white dark:ring-transparent dark:focus:ring-purple dark:hover:ring-transparent"
			/>
		);
	}
);

TextField.displayName = "TextField";
