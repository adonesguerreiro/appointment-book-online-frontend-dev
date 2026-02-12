import { Heading } from "@chakra-ui/react";

export default function HeadingComponent({ title }: { title: string }) {
	return (
        <Heading
			size="lg"
			fontWeight="semibold"
			asChild><h1>
                {title}
            </h1></Heading>
    );
}
