import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./shared/components/Sidebar";

export function AppLayout() {
	return (
		<Box>
			<Sidebar />
			<Box
				ml={{ base: 0, md: 60 }}
				p="4">
				<Outlet />
			</Box>
		</Box>
	);
}
