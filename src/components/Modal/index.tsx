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

interface ModalComponentProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	title: string;
	itemName: string;
}

export default function ModalComponent({
	isOpen,
	onClose,
	onDelete,
	title,
	itemName,
}: ModalComponentProps) {
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
						Deseja realmente excluir o{" "}
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
