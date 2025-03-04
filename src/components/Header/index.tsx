import {
	Box,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	WrapItem,
	Image,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../assets/logo.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { FormDataUser } from "../../interface/FormDataUser";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/User/useUser";
import { useEffect } from "react";

export default function Header() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const { avatar } = useAvatar();
	const { reset } = useForm<FormDataUser>();

	const { fetchDataUser } = useUser({ reset });

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const goToUserProfile = () => {
		navigate("/user");
	};

	const goToCompany = () => {
		navigate("/company");
	};

	useEffect(() => {
		if (!avatar) {
			fetchDataUser();
		}
	}, [avatar, fetchDataUser]);

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
				<Image
					src={Logo}
					alt="logo"
					width="3rem"
					height="3rem"
				/>
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
									// name="Adones"
									// src="https://avatars.githubusercontent.com/u/60514105?v=4"
									id="avatarUrl"
									src={avatar as string}
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
