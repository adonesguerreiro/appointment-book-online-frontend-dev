import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AvatarProvider } from "./features/users/context/AvatarProvider";
import { ProfilePhotoProvider } from "./features/users/context/ProfilePhotoProvider";
const queryClient = new QueryClient();
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
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
