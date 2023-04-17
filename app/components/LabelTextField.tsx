import React from "react";

type LabelTextFieldProps = {
	errorMessage?: string;
	children: React.ReactNode;
	label: string;
	isRequiredField?: boolean;
};

export function LabelTextField({
	errorMessage,
	label,
	isRequiredField = false,
	children,
}: LabelTextFieldProps) {
	return (
		<label className="flex w-full cursor-pointer flex-col gap-3 whitespace-nowrap">
			<div className="flex items-center gap-3 text-sm md:justify-between md:gap-0">
				<p className="capitalize text-shipCove dark:text-white">
					{label}
					{!isRequiredField && " (optional)"}
				</p>
				<p className="text-burntSienna">{errorMessage}</p>
			</div>
			{children}
		</label>
	);
}
