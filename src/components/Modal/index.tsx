import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";

interface ModalComponentProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ModalComponent({
	isOpen,
	onClose,
}: ModalComponentProps) {
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>This is the modal body.</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
