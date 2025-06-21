import {
	Box,
	Link,
	VStack,
	Grid,
	Text,
	useBreakpointValue,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from "@chakra-ui/react";
import { MdDashboard, MdEventAvailable, MdEventBusy } from "react-icons/md";
import {
	FaChevronDown,
	FaChevronUp,
	FaClock,
	FaWrench,
	FaUser,
} from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
	const navigate = useNavigate();

	const [showSubmenu, setSubmenu] = useState(false);

	const handleSubmenuToggle = () => setSubmenu(!showSubmenu);

	const textSideBarMenu = [
		{
			name: "Dashboard",
			icon: <MdDashboard />,
			path: "/",
		},
		{
			name: "Agendamentos",
			icon: <GrSchedule />,
			path: "/schedule",
		},
		{
			name: "Serviços",
			icon: <FaWrench />,
			path: "/service",
		},
		{
			name: "Clientes",
			icon: <FaUser />,
			path: "/customer",
		},
	];

	const textSideBarSubMenuTime = [
		{
			name: "Horário disponíveis",
			icon: <MdEventAvailable />,
			path: "/avaliable-time",
		},
		{
			name: "Horário indisponíveis",
			icon: <MdEventBusy />,
			path: "/unavaliable-time",
		},
	];

	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Box
			as="nav"
			position="fixed"
			left="0"
			top="0"
			w={{ base: "auto", md: "15.625rem" }}
			h="full"
			bg="blackAlpha.900"
			color="white"
			p="4">
			<VStack
				align="start"
				spacing="8"
				paddingTop="5rem">
				{textSideBarMenu.map((item) =>
					isMobile ? (
						<Popover
							trigger="click"
							placement="right-start"
							key={item.name}>
							<PopoverTrigger>
								<Box
									as="button"
									display="flex"
									alignItems="center"
									justifyContent="center"
									w="3rem"
									h="3rem"
									cursor="pointer"
									_hover={{ bg: "gray.700" }}>
									{item.icon}
								</Box>
							</PopoverTrigger>
							<PopoverContent
								bg="blackAlpha.800"
								color="white"
								border="none"
								w="auto">
								<PopoverBody
									cursor="pointer"
									onClick={() => navigate(item.path)}
									_hover={{ color: "teal.300" }}>
									{item.name}
								</PopoverBody>
							</PopoverContent>
						</Popover>
					) : (
						<Link
							key={item.name}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							gap="0.625rem"
							_hover={{ textDecoration: "none", color: "teal.300" }}
							onClick={() => navigate(item.path)}>
							{item.icon}
							<Text display={{ base: "none", md: "block" }}>{item.name}</Text>
						</Link>
					)
				)}

				<Grid
					_hover={{
						height: "2.75rem",
						borderRadius: "0.625rem",
						padding: "0.625rem",
						background: "blue.800",
					}}>
					<Link
						display="flex"
						alignItems="center"
						gap="0.625rem"
						_hover={{ textDecoration: "none", color: "teal.300" }}
						onClick={handleSubmenuToggle}>
						<FaClock />
						<Text display={{ base: "none", md: "block" }}>Horário</Text>
						{showSubmenu ? <FaChevronUp /> : <FaChevronDown />}
					</Link>

					<Grid
						padding="1.25rem"
						gap="0.9375rem">
						{textSideBarSubMenuTime.map((item) =>
							showSubmenu && !isMobile ? (
								<Link
									key={item.name}
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									_hover={{ textDecoration: "none", color: "teal.300" }}
									onClick={() => navigate(item.path)}>
									{item.icon}
									{item.name}
								</Link>
							) : (
								!showSubmenu &&
								isMobile && (
									<Popover
										trigger="click"
										placement="right-start"
										key={item.name}>
										<PopoverTrigger>
											<Box
												as="button"
												display="flex"
												alignItems="center"
												justifyContent="center"
												w="3rem"
												h="3rem"
												cursor="pointer"
												_hover={{ bg: "gray.700" }}>
												{item.icon}
											</Box>
										</PopoverTrigger>
										<PopoverContent
											bg="blackAlpha.800"
											color="white"
											border="none"
											w="auto">
											<PopoverBody
												cursor="pointer"
												onClick={() => navigate(item.path)}
												_hover={{ color: "teal.300" }}>
												{item.name}
											</PopoverBody>
										</PopoverContent>
									</Popover>
								)
							)
						)}
					</Grid>
				</Grid>
			</VStack>
		</Box>
	);
}
