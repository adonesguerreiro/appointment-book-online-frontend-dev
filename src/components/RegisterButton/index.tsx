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
			marginLeft={{ base: "auto", md: "100%" , lg: "100%" }}>
            <Button colorPalette="teal" position="initial" size="lg" onClick={onNewClick}>{buttonText}{<FaPlus />}</Button>
        </Box>
    );
}
