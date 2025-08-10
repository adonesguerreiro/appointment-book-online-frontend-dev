import {
	Flex,
	useColorModeValue,
	IconButton,
	HStack,
	Menu,
	MenuButton,
	Avatar,
	VStack,
	Box,
	MenuList,
	MenuItem,
	MenuDivider,
	FlexProps,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import { useUser } from "../../hooks/User/useUser";
import { FormDataUser } from "../../interface/FormDataUser";

interface MobileProps extends FlexProps {
	onOpen: () => void;
}

export default function MobileNav({ onOpen, ...rest }: MobileProps) {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const { avatar } = useAvatar();

	const { reset } = useForm<FormDataUser>();

	const { fetchDataUser } = useUser({ reset });
	const [userName, setUserName] = useState("");

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const handleUserProfile = () => {
		navigate("/user");
	};

	const goToCompany = () => {
		navigate("/company");
	};

	useEffect(() => {
		const listDataUser = async () => {
			const getUserById = await fetchDataUser();
			setUserName(getUserById?.name);

			if (!avatar) {
				fetchDataUser();
			}
		};

		listDataUser();
	}, [avatar, fetchDataUser]);

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("blackAlpha.900", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="link"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"></Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size="lg"
					variant="link"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}>
							<HStack>
								<Avatar
									size={"sm"}
									src={avatar as string}
								/>
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
									color="white">
									<Text fontSize="sm">Olá, {userName.split(" ")[0]}</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}>
							<MenuItem onClick={handleUserProfile}>Perfil do usuário</MenuItem>
							<MenuItem onClick={goToCompany}>Perfil da empresa</MenuItem>
							<MenuDivider />
							<MenuItem onClick={handleLogout}>Deslogar</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
}
