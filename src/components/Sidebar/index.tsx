import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
export default function Sidebar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
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
