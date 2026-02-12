import { Heading } from "@chakra-ui/react";

export default function HeadingComponent({ title }: { title: string }) {
	return (
        <Heading
			size="lg"
			fontWeight="semibold"
			>
                {title}
            </Heading>
    );
}
