import { Heading } from "@chakra-ui/react";

export default function HeadingComponent({ title }: { title: string }) {
	return (
		<Heading
			as="h1"
			size="lg"
			fontWeight="semibold">
			{title}
		</Heading>
	);
}
