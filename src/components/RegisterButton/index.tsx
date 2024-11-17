import { Box, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface RegisterButtonProps {
	onNewClick: () => void;
	buttonText: string;
}

export default function RegisterButton({
	onNewClick,
	buttonText,
}: RegisterButtonProps) {
	return (
		<Box
			padding="0.625rem"
			marginLeft="100%">
			<Button
				colorScheme="teal"
				size="lg"
				rightIcon={<FaPlus />}
				onClick={onNewClick}>
				{buttonText}
			</Button>
		</Box>
	);
}
