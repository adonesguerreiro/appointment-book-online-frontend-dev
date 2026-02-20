import {
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	BoxProps,
	useDisclosure,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { GrSchedule } from "react-icons/gr";
import NavItem from "./NavItem";
import { MdDashboard, MdEventAvailable, MdEventBusy } from "react-icons/md";
import { FaClock, FaUser, FaWrench } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

interface LinkItemProps {
	name: string;
	icon: IconType;
	path?: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: "Dashboard", icon: MdDashboard, path: "/" },
	{ name: "Agendamentos", icon: GrSchedule, path: "/schedule" },
	{ name: "Serviços", icon: FaWrench, path: "/service" },
	{ name: "Clientes", icon: FaUser, path: "/customer" },
	{ name: "Horários", icon: FaClock },
];

const SubMenuTime: Array<LinkItemProps> = [
	{
		name: "Disponíveis",
		icon: MdEventAvailable,
		path: "/avaliable-time",
	},
	{
		name: "Indisponíveis",
		icon: MdEventBusy,
		path: "/unavaliable-time",
	},
];

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("blackAlpha.900", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between">
				<Box
					width="4.125rem"
					height="4.125rem"
					display="flex"
					justifyContent="center"
					alignItems="center">
					<img
						src="/logo.svg"
						alt="Logo"
					/>
				</Box>

				<CloseButton
					display={{ base: "flex", md: "none" }}
					onClick={onClose}
				/>
			</Flex>
			{LinkItems.map((link) =>
				link.path ? (
					<NavItem
						key={link.name}
						icon={link.icon}
						color={"white"}
						path={link.path}>
						{link.name}
					</NavItem>
				) : (
					<Box key={link.name}>
						<NavItem
							key={link.name}
							icon={link.icon}
							color="white"
							gap="1"
							onClick={onToggle}>
							{link.name}
							{isOpen ? <FiChevronUp /> : <FiChevronDown />}
						</NavItem>

						{isOpen && (
							<>
								{SubMenuTime.map((subLink) => (
									<NavItem
										key={subLink.name}
										icon={subLink.icon}
										color="white"
										path={subLink.path}>
										{subLink.name}
									</NavItem>
								))}
							</>
						)}
					</Box>
				)
			)}
		</Box>
	);
}
