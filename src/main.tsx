import * as React from "react";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AvatarProvider } from "./features/users/context/AvatarProvider";
import { ProfilePhotoProvider } from "./features/users/context/ProfilePhotoProvider";
const queryClient = new QueryClient();
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	enableLogs: true,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!, {
	onUncaughtError: Sentry.reactErrorHandler(),
	onCaughtError: Sentry.reactErrorHandler(),
	onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
	<React.StrictMode>
		<AuthProvider>
			<ProfilePhotoProvider>
				<AvatarProvider>
					<QueryClientProvider client={queryClient}>
						<ChakraProvider>
							<RouterProvider router={router} />
						</ChakraProvider>
					</QueryClientProvider>
				</AvatarProvider>
			</ProfilePhotoProvider>
		</AuthProvider>
	</React.StrictMode>,
);
