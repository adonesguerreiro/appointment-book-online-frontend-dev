import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AvatarProvider } from "./context/AvatarProvider";
import { ProfilePhotoProvider } from "./context/ProfilePhotoProvider";

const colors = {
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},
};

const theme = extendTheme({ colors });

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
	<React.StrictMode>
		<AuthProvider>
			<ProfilePhotoProvider>
				<AvatarProvider>
					<ChakraProvider theme={theme}>
						<QueryClientProvider client={queryClient}>
							<App />
						</QueryClientProvider>
					</ChakraProvider>
				</AvatarProvider>
			</ProfilePhotoProvider>
		</AuthProvider>
	</React.StrictMode>
);
