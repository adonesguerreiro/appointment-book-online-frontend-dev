import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";
import { Box, Drawer, useDisclosure } from "@chakra-ui/react";
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
				placement={"start"}
				onOpenChange={onClose}
				closeOnInteractOutside={false}
				onExitComplete={onClose}
				size="full">
				<Drawer.Content>
					<SidebarContent onClose={onClose} />
				</Drawer.Content>
			</Drawer.Root>
			<MobileNav onOpen={onOpen} />
			<Box
				ml={{ base: 0, md: 60 }}
				p="4"></Box>
		</Box>
	);
}
