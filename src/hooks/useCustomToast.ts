import { useToast } from "@chakra-ui/react";

export function useCustomToast() {
	const toast = useToast();

	const showToast = ({
		title,
		status,
		duration = 3000,
		position = "top-right",
	}: {
		title: string;
		status: "info" | "warning" | "success" | "error" | "loading";
		duration?: number;
		position?:
			| "top"
			| "top-right"
			| "top-left"
			| "bottom"
			| "bottom-right"
			| "bottom-left";
	}) => {
		toast({
			title,
			status,
			duration,
			isClosable: true,
			position,
		});
	};

	return { showToast };
}
