import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
} from "@chakra-ui/react";

interface ModalDeleteProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete?: () => void;
	title: string;
	description: string;
	itemName: string;
}

export default function ModalDelete({
	isOpen,
	onClose,
	onDelete,
	title,
	itemName,
	description,
}: ModalDeleteProps) {
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Excluir {title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{description}
						<Text
							as="span"
							fontWeight="bold">
							{itemName}
						</Text>
						?
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="red"
							mr={3}
							onClick={onDelete}>
							Excluir
						</Button>
						<Button
							colorScheme="gray"
							mr={3}
							onClick={onClose}>
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
