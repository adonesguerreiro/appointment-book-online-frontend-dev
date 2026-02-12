import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";
import { Box, Drawer, useDisclosure, Portal } from "@chakra-ui/react";
export default function Sidebar() {
	const { open, onOpen, onClose } = useDisclosure();

	return (
		<Box>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer.Root
				open={open}
				placement="start"
				onOpenChange={() => onClose()}
				onInteractOutside={onClose}
				size="full">
				<Portal>
					<Drawer.Positioner>
						<Drawer.Content>
							<SidebarContent onClose={onClose} />
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box
				ml={{ base: 0, md: 60 }}
				p="4">
				{/* Content */}
			</Box>
		</Box>
	);
}
