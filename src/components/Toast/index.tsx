import { useToast } from "@chakra-ui/react";

export default function Toast({
	title,
	status,
}: {
	title: string;
	status: "info" | "warning" | "success" | "error" | "loading";
}) {
	const toast = useToast();
	return toast({
		title: title,
		status: status,
		duration: 3000,
		isClosable: true,
		position: "top-right",
	});
}
