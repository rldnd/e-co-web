import { ChangeEventHandler, MouseEventHandler } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";

import { IconChevronLeft } from "@/assets/icons/common";
import Avatar from "@/components/Common/Avatar";
import IconButton from "@/components/Common/Button/IconButton";
import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Dropzone from "@/components/Common/Dropzone";
import Input from "@/components/Common/Input";
import HeightFitLayout from "@/components/Layout/HeightFitLayout";
import UserTypeChecker from "@/components/User/UserTypeChecker";
import { useToast } from "@/hooks";
import { useSignUpMutation } from "@/queries/auth/mutations";
import { useUploadImageMutation } from "@/queries/images/mutations";
import { getKyHTTPError, isKyHTTPError } from "@/services/apiClient";

import { registerSchema, RegisterSchema } from "./validator";

import styles from "./registerPage.module.scss";

const RegisterPage: React.FC = () => {
	const { addToast } = useToast();
	const navigate = useNavigate();

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<RegisterSchema>({
		mode: "onTouched",
		resolver: zodResolver(registerSchema),
	});

	const { mutateAsync: signUp } = useSignUpMutation();
	const { mutateAsync: uploadImage } = useUploadImageMutation();

	const onClickClear: MouseEventHandler<HTMLButtonElement> = (e) => {
		const name = e.currentTarget.name as keyof RegisterSchema;
		setValue(name, "", { shouldValidate: true });
	};

	const onDrop = (files: File[]) => {
		if (files.length !== 1) return;
		return files[0];
	};

	const handleUploadImage = async (file?: File) => {
		if (!file) return;
		const formData = new FormData();
		formData.append("image", file);
		return await uploadImage(formData);
	};

	const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
		try {
			const { thumbnailFile, ...rest } = data;
			const imageResponse = await handleUploadImage(thumbnailFile);

			const { data: resultMessage } = await signUp({
				...rest,
				thumbnail: imageResponse ? imageResponse.imageUrl : null,
			});
			addToast({ state: "positive", message: resultMessage });
			navigate({
				to: "/auth/register-complete",
				replace: true,
				search: { nickname: data.nickname, userType: data.userType },
			});
		} catch (err) {
			if (isKyHTTPError(err)) {
				const { message } = await getKyHTTPError(err);
				addToast({ state: "negative", message });
			}
		}
	};

	return (
		<HeightFitLayout className={styles.wrapper}>
			<main className={styles.registerForm}>
				<div className={styles.header}>
					<h1 className={styles.title}>회원가입</h1>
					<Link className={styles.backButton} to="..">
						<IconButton>
							<IconChevronLeft />
						</IconButton>
					</Link>
				</div>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="thumbnailFile"
						control={control}
						render={({ field: { value, onChange } }) => (
							<Dropzone
								options={{
									onDrop: (files) => onChange(onDrop(files)),
									multiple: false,
									noDragEventsBubbling: true,
									accept: { "image/png": [], "image/jpeg": [] },
								}}
							>
								<Avatar size={100} src={value ? URL.createObjectURL(value) : null} hasEdit />
							</Dropzone>
						)}
					/>

					<Input
						label="이메일"
						type="text"
						inputMode="email"
						autoComplete="email"
						errorMessage={errors.email?.message}
						placeholder="이메일을 입력하세요"
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("email")}
					/>
					<Input
						label="닉네임"
						type="text"
						inputMode="text"
						autoComplete="username"
						errorMessage={errors.nickname?.message}
						placeholder="닉네임을 입력하세요"
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("nickname")}
					/>
					<Input
						label="비밀번호"
						placeholder="비밀번호를 입력하세요"
						type="password"
						inputMode="text"
						autoComplete="new-password"
						errorMessage={errors.password?.message}
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("password")}
					/>
					<Input
						label="비밀번호 확인"
						type="password"
						inputMode="text"
						autoComplete="new-password"
						errorMessage={errors.passwordConfirm?.message}
						placeholder="비밀번호와 동일하게 입력하세요"
						required
						className={styles.input}
						onClickClearButton={onClickClear}
						{...register("passwordConfirm")}
					/>
					<div className={styles.userTypeCheckerWrapper}>
						<span className={styles.label}>농인 / 청인</span>
						<Controller
							name="userType"
							control={control}
							render={({ field: { value, onChange } }) => <UserTypeChecker userType={value} onChange={onChange} />}
						/>
					</div>
					<div className={styles.registerButtonWrapper}>
						<SolidPrimaryButton
							size="medium"
							type="submit"
							fill
							className={styles.registerButton}
							disabled={!isValid || isSubmitting}
						>
							회원가입 하기
						</SolidPrimaryButton>
					</div>
				</form>
			</main>
		</HeightFitLayout>
	);
};

export default RegisterPage;
