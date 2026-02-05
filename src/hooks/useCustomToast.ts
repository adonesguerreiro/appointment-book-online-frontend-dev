import { createToaster } from "@chakra-ui/react";

export function useCustomToast() {
	const showToast = ({
		title,
		type,
		duration = 3000,
		placement = "top-end",
	}: {
		title: string;
		type: "info" | "warning" | "success" | "error" | "loading";
		duration?: number;
		placement?:
			| "top-end"
			| "top-start"
			| "bottom-end"
			| "bottom-start"
			| "top"
			| "bottom";
	}) => {
		const toaster = createToaster({
			duration,
			placement,
		});

		toaster.create({
			title,
			type,
			closable: true,
			duration,
		});
	};

	return { showToast };
}
