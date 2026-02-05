import {
	Avatar,
	Box,
	Button,
	Dialog,
	Input,
	useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../../interface/FormDataUser";
import { useAvatar } from "../../hooks/useAvatar";
import { useProfilePhoto } from "../../hooks/useProfilePhoto";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../validators/userSchema";

export default function CropperComponent() {
	const { getValues } = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
		mode: "onChange",
	});

	const { setProfilePhoto } = useProfilePhoto();
	const { avatar, setAvatar } = useAvatar();
	const { open, onClose, onOpen } = useDisclosure();

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const onCropComplete = useCallback(
		(_croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[],
	);

	const showCroppedImage = useCallback(() => {
		if (!croppedAreaPixels || !avatar) return;

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = croppedAreaPixels.width;
		canvas.height = croppedAreaPixels.height;

		const image = new Image();
		image.src =
			typeof avatar === "string" ? avatar : URL.createObjectURL(avatar);

		image.onload = () => {
			ctx.drawImage(
				image,
				croppedAreaPixels.x,
				croppedAreaPixels.y,
				croppedAreaPixels.width,
				croppedAreaPixels.height,
				0,
				0,
				croppedAreaPixels.width,
				croppedAreaPixels.height,
			);

			canvas.toBlob((blob) => {
				if (!blob) return;
				const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

				setAvatar(URL.createObjectURL(file));
				setProfilePhoto(file);

				onClose();
			});
		};
	}, [croppedAreaPixels, avatar, onClose, setAvatar, setProfilePhoto]);
	return (
		<Box
			position="relative"
			width="100%"
			height="100%">
			<Avatar.Image
				sizes="xl"
				id="avatar"
				src={(avatar as string) || (getValues("avatarUrl") as string)}
			/>
			<Avatar.Fallback name={getValues("name") || ""} />
			<Input
				id="avatarUrl"
				type="file"
				accept="image/*"
				position="absolute"
				top={0}
				left={0}
				width="100%"
				height="100%"
				opacity={0}
				cursor="pointer"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) {
						if (avatar) {
							URL.revokeObjectURL(avatar as string);
						}
						const fileUrl = URL.createObjectURL(file);
						setAvatar(fileUrl);
						setProfilePhoto(file);
						onOpen();
					}
				}}
			/>

			<Dialog.Root
				open={open}
				onOpenChange={onClose}>
				<Dialog.Backdrop />
				<Dialog.Content>
					<Dialog.Body style={{ position: "relative", height: 400 }}>
						{avatar && (
							<Box
								position="relative"
								width="full"
								height="25rem">
								<Cropper
									image={avatar as string}
									crop={crop}
									zoom={zoom}
									aspect={4 / 3}
									onCropChange={setCrop}
									onZoomChange={setZoom}
									onCropComplete={onCropComplete}
								/>
							</Box>
						)}
					</Dialog.Body>
					<Dialog.Footer>
						<Button
							onClick={showCroppedImage}
							colorScheme="blue">
							Confirmar
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</Box>
	);
}
