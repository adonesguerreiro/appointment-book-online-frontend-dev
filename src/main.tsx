import * as React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AvatarProvider } from "./context/AvatarProvider";
import { ProfilePhotoProvider } from "./context/ProfilePhotoProvider";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
	<React.StrictMode>
		<AuthProvider>
			<ProfilePhotoProvider>
				<AvatarProvider>
					<ChakraProvider value={defaultSystem}>
						<QueryClientProvider client={queryClient}>
							<App />
						</QueryClientProvider>
					</ChakraProvider>
				</AvatarProvider>
			</ProfilePhotoProvider>
		</AuthProvider>
	</React.StrictMode>
);
