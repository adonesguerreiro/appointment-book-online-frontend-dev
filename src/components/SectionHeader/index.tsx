import { Heading } from "@chakra-ui/react";

interface SectionHeaderProps {
	title: string;
}
export default function SectionHeader({ title }: SectionHeaderProps) {
	return (
        <Heading
			size="lg"
			fontWeight="semibold"
			asChild><h1>
                {title}
            </h1></Heading>
    );
}
