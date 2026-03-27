import { useAuth } from "./features/auth/context/AuthContext";
import { Skeleton } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, loading } = useAuth();

	if (loading) {
		return <Skeleton height="100vh" />;
	}

	if (!user) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return <>{children}</>;
}
