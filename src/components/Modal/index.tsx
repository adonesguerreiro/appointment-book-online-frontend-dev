import { Dialog, Button, Text } from "@chakra-ui/react";

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
			<Dialog.Root
				open={isOpen}
				onOpenChange={onClose}>
				<Dialog.Backdrop />
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Excluir {title}</Dialog.Title>
					</Dialog.Header>
					<Dialog.CloseTrigger />
					<Dialog.Body>
						{description}
						<Text
							as="span"
							fontWeight="bold">
							{itemName}
						</Text>
						?
					</Dialog.Body>

					<Dialog.Footer>
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
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</>
	);
}
