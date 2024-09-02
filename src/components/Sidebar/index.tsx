import { Box, Link, VStack, Text, Grid } from "@chakra-ui/react";
import { MdDashboard, MdEventAvailable, MdEventBusy } from "react-icons/md";
import { FaChevronDown, FaChevronUp, FaClock, FaWrench } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
	const navigate = useNavigate();

	const goToDashboard = () => navigate("/");

	const goToService = () => navigate("/service");

	const goToSchedule = () => navigate("/schedule");

	const goToAvaliableTime = () => navigate("/avaliable-time");

	const goToUnavaliableTime = () => navigate("/unavaliable-time");

	const [showSubmenu, setSubmenu] = useState(false);

	const handleSubmenuToggle = () => setSubmenu(!showSubmenu);

	return (
		<Box
			as="nav"
			position="fixed"
			left="0"
			top="0"
			w="250px"
			h="100vh"
			bg="blackAlpha.900"
			color="white"
			p="4">
			<VStack
				align="start"
				spacing="8">
				<Text
					fontSize="2xl"
					fontWeight="bold">
					Menu
				</Text>
				<Grid
					_hover={{
						width: "14.25rem",
						height: "2.75rem",
						borderRadius: "0.625rem",
						padding: "0.625rem",
						background: "blue.800",
					}}>
					<Link
						display="flex"
						alignItems="center"
						gap="0.625rem"
						href="#"
						_hover={{
							textDecoration: "none",
							color: "teal.300",
						}}
						onClick={goToDashboard}>
						<MdDashboard />
						Dashboard
					</Link>
				</Grid>

				<Grid
					_hover={{
						width: "14.25rem",
						height: "2.75rem",
						borderRadius: "0.625rem",
						padding: "0.625rem",
						background: "blue.800",
					}}>
					<Link
						display="flex"
						alignItems="center"
						gap="0.625rem"
						_hover={{
							textDecoration: "none",
							color: "teal.300",
						}}
						onClick={goToService}>
						<FaWrench />
						Serviços
					</Link>
				</Grid>

				<Grid
					_hover={{
						width: "14.25rem",
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
						onClick={goToSchedule}>
						<GrSchedule />
						Agenda
					</Link>
				</Grid>

				<Grid
					_hover={{
						width: "14.25rem",
						height: "2.75rem",
						borderRadius: "0.625rem",
						padding: "0.625rem",
						background: "blue.800",
					}}>
					<Link
						display="flex"
						alignItems="center"
						gap="0.625rem"
						href="#"
						_hover={{ textDecoration: "none", color: "teal.300" }}
						onClick={handleSubmenuToggle}>
						<FaClock />
						Horário {showSubmenu ? <FaChevronUp /> : <FaChevronDown />}
					</Link>

					{showSubmenu ? (
						<Grid
							padding="1.25rem"
							gap="0.9375rem">
							<Link
								display="flex"
								alignItems="center"
								justifyContent="space-around"
								href="#"
								_hover={{ textDecoration: "none", color: "teal.300" }}
								onClick={goToAvaliableTime}>
								<MdEventAvailable />
								Horário disponíveis
							</Link>
							<Link
								display="flex"
								alignItems="center"
								justifyContent="space-between"
								href="#"
								_hover={{ textDecoration: "none", color: "teal.300" }}
								onClick={goToUnavaliableTime}>
								<MdEventBusy />
								Horário indisponíveis
							</Link>
						</Grid>
					) : null}
				</Grid>
			</VStack>
		</Box>
	);
}
