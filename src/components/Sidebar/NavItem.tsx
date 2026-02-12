import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: React.ReactNode;
	path?: string;
}

export default function NavItem({
	icon,
	children,
	path,
	...rest
}: NavItemProps) {
	return (
		<Box
			textDecoration="none"
			_hover={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
			asChild>
			<a href={path}>
				<Flex
					align="center"
					p="4"
					mx="4"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					_hover={{
						bg: "cyan.400",
						color: "white",
					}}
					{...rest}>
					{!!icon && (
						<Icon
							mr="4"
							fontSize="16"
							_groupHover={{
								color: "white",
							}}
							asChild>
							<Icon />
						</Icon>
					)}
					{children}
				</Flex>
			</a>
		</Box>
	);
}
