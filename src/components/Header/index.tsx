import {
	Box,
	Button,
	Flex,
	Heading,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	WrapItem,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout(); // Realiza o logout
		navigate("/login"); // Redireciona para a página de login
	};

	const goToUserProfile = () => {
		navigate("/user");
	};

	const goToCompany = () => {
		navigate("/company");
	};

	return (
		<Box
			as="header"
			bg="blackAlpha.900"
			position="fixed"
			top="0"
			right="0"
			width="87%"
			zIndex={2}
			color="white"
			px={4}
			py={2}
			boxShadow="md">
			<Flex align="center">
				<Heading
					as="h1"
					size="lg">
					Logo
				</Heading>
				<Spacer />
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<FaChevronDown />}
						variant="link"
						colorScheme="whiteAlpha"
						_hover={{ textDecoration: "none" }}>
						<Flex
							gap="0.625rem"
							alignItems="center">
							<WrapItem>
								<Avatar
									name="Adones"
									src="https://avatars.githubusercontent.com/u/60514105?v=4"
								/>
							</WrapItem>
							Adones
						</Flex>
					</MenuButton>
					<MenuList
						bg="blackAlpha.900"
						color="white"
						borderColor="blackAlpha.700">
						<MenuItem
							bg="blackAlpha.900"
							_hover={{ bg: "blackAlpha.800" }}
							_focus={{ bg: "blackAlpha.800" }}
							onClick={goToUserProfile}>
							Perfil do usuário
						</MenuItem>
						<MenuItem
							bg="blackAlpha.900"
							_hover={{ bg: "blackAlpha.800" }}
							_focus={{ bg: "blackAlpha.800" }}
							onClick={goToCompany}>
							Perfil da empresa
						</MenuItem>
						<MenuItem
							bg="blackAlpha.900"
							_hover={{ bg: "blackAlpha.800" }}
							_focus={{ bg: "blackAlpha.800" }}
							onClick={handleLogout}>
							Deslogar
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Box>
	);
}
