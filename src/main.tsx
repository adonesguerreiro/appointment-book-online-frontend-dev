import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AvatarProvider } from "./context/AvatarProvider";
import { ProfilePhotoProvider } from "./context/ProfilePhotoProvider";
const queryClient = new QueryClient();
import { ChakraProvider } from '@chakra-ui/react'

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
	<React.StrictMode>
		<AuthProvider>
			<ProfilePhotoProvider>
				<AvatarProvider>
						<QueryClientProvider client={queryClient}>
							<ChakraProvider>
								<App />
							</ChakraProvider>
						</QueryClientProvider>
				</AvatarProvider>
			</ProfilePhotoProvider>
		</AuthProvider>
	</React.StrictMode>
);
