import * as React from "react";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AvatarProvider } from "./context/AvatarProvider";
import { ProfilePhotoProvider } from "./context/ProfilePhotoProvider";

const colors = {
	brand: {
		900: {
            value: "#1a365d",
        },
		800: {
            value: "#153e75",
        },
		700: {
            value: "#2a69ac",
        },
	},
};

const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors,
        },
    },
});

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
	<React.StrictMode>
		<AuthProvider>
			<ProfilePhotoProvider>
				<AvatarProvider>
					<ChakraProvider value={system}>
						<QueryClientProvider client={queryClient}>
							<App />
						</QueryClientProvider>
					</ChakraProvider>
				</AvatarProvider>
			</ProfilePhotoProvider>
		</AuthProvider>
	</React.StrictMode>
);
