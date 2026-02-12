import { Button, Text, Dialog } from "@chakra-ui/react";

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
				<Dialog.Positioner><Dialog.Content>
                        <Dialog.Header>Excluir {title}</Dialog.Header>
                        <Dialog.CloseTrigger />
                        <Dialog.Body>
                            {description}
                            <Text
                                fontWeight="bold"
                                asChild><span>
                                    {itemName}
                                </span></Text>
                            ?
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Button
                                colorPalette="red"
                                mr={3}
                                onClick={onDelete}>
                                Excluir
                            </Button>
                            <Button
                                colorPalette="gray"
                                mr={3}
                                onClick={onClose}>
                                Cancelar
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content></Dialog.Positioner>
			</Dialog.Root>
        </>
    );
}
