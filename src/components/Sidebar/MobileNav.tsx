import {
	Flex,
	IconButton,
	Menu,
	Avatar,
	VStack,
	Box,
	FlexProps,
	Text,
	Portal,
	Button,
	HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../../hooks/useAvatar";
import { useUser } from "../../hooks/User/useUser";
import { FormDataUser } from "../../interface/FormDataUser";
import { logout } from "../../services/api";

interface MobileProps extends FlexProps {
	onOpen: () => void;
}

export default function MobileNav({ onOpen, ...rest }: MobileProps) {
	const navigate = useNavigate();
	const { avatar } = useAvatar();

	const { reset } = useForm<FormDataUser>();

	const { fetchDataUser } = useUser({ reset });
	const [userName, setUserName] = useState("");

	const handleLogout = async () => {
		await logout();
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
				variant="ghost"
				aria-label="open menu"
			/>
            <FiMenu />
            <Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"></Text>
            <HStack gap={{ base: "0", md: "6" }}>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
				/>
				<FiBell />
				<Flex alignItems={"center"}>
					<Menu.Root>
						<Menu.Trigger asChild>
							<Button
								py={2}
								transition="all 0.3s"
								_focus={{ boxShadow: "none" }}>
								<HStack>
									<Avatar.Root>
										<Avatar.Root />
										<Avatar.Root>{userName?.[0]}</Avatar.Root>
									</Avatar.Root>
									<VStack
										display={{ base: "none", md: "flex" }}
										alignItems="flex-start"
										gap="1"
										ml="2"
										color="white">
										<Text fontSize="sm">Olá, {userName.split(" ")[0]}</Text>
									</VStack>
									<Box display={{ base: "none", md: "flex" }}>
										<FiChevronDown />
									</Box>
								</HStack>
							</Button>
						</Menu.Trigger>
						<Portal>
							<Menu.Root>
								<Menu.Trigger
									bg={useColorModeValue("white", "gray.900")}
									borderColor={useColorModeValue("gray.200", "gray.700")}>
									<Menu.Item
										onClick={handleUserProfile}
										value="profile">
										Perfil do usuário
									</Menu.Item>
									<Menu.Item
										onClick={goToCompany}
										value="company">
										Perfil da empresa
									</Menu.Item>
									<Menu.Trigger/>
									<Menu.Item
										onClick={handleLogout}
										value="logout">
										Deslogar
									</Menu.Item>
								</Menu.Trigger>
							</Menu.Root>
						</Portal>
					</Menu.Root>
				</Flex>
			</HStack>
        </Flex>
    );
}
