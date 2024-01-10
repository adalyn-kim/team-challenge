import { useEffect, useState } from 'react';
import cn from 'classnames';

import {
	Button,
	CarouselIndicators,
	Form,
	Input,
	Label,
	Modal,
	TextArea,
	Typography,
} from '@goorm-dev/gds-challenge';

import CONSTANT from '../constants';

import styles from './SurveyModalBody.module.scss';

const SurveyModalBody = ({
	formData,
	changeFormData,
	currentStep,
	checkAllAgreements,
}) => {
	const CurrentInputGroup = SurveyModalBody[`Step${currentStep + 1}`];

	return (
		<div className={styles.ConfirmChallengerInfo__inputList}>
			<CurrentInputGroup
				formData={formData}
				changeFormData={changeFormData}
				checkAllAgreements={checkAllAgreements}
			/>
		</div>
	);
};

SurveyModalBody.Step1 = ({ formData, changeFormData, checkAllAgreements }) => {
	console.log('formData >> ', formData);
	return (
		<Modal.Body>
			<div className={cn(styles.container)}>
				<div className={cn(styles.container__header)}>
					<Typography token="h5">
						참여자 정보를 입력해주세요
					</Typography>
					<Typography token="caption">
						오프라인 팀 챌린지 참여자의 정보를 수집하려고 해요.
					</Typography>
				</div>
				<div className={cn(styles.container__body)}>
					<Form.Group>
						<Label required>이름</Label>
						<Input
							placeholder="이름을 입력해주세요."
							value={formData.name}
							onChange={(e) => {
								return changeFormData({ name: e.target.value });
							}}
						/>
					</Form.Group>
					<Form.Group>
						<Label required type="tel">
							전화번호
						</Label>
						<Input
							placeholder="ex. 01012345678"
							value={formData.phone}
							onChange={(e) => {
								return changeFormData({
									phone: e.target.value,
								});
							}}
						/>
					</Form.Group>
					<Form.Group>
						<Label required type="email">
							이메일
						</Label>
						<Input
							placeholder="ex. goormee@goorm.io"
							value={formData.email}
							onChange={(e) => {
								return changeFormData({
									email: e.target.value,
								});
							}}
						/>
					</Form.Group>
				</div>

				<div className={cn(styles.container__footer)}>
					<Form.Group>
						<Input
							label="전체 동의"
							type="checkbox"
							checked={
								formData.agreements.personal &&
								formData.agreements.marketing &&
								formData.agreements.advertisement
							}
							onChange={(e) => {
								return checkAllAgreements(e.target.checked);
							}}
						/>
					</Form.Group>
					<Form.Group>
						<Input
							label="(필수) 개인정보처리방침"
							type="checkbox"
							checked={formData.agreements.personal}
							onChange={(e) => {
								return changeFormData({
									agreements: {
										...formData.agreements,
										personal: e.target.checked,
									},
								});
							}}
						/>
					</Form.Group>
					<Form.Group>
						<Input
							label="(선택) 마케팅 목적의 개인 정보 수집 및 이용"
							type="checkbox"
							checked={formData.agreements.marketing}
							onChange={(e) => {
								return changeFormData({
									agreements: {
										...formData.agreements,
										marketing: e.target.checked,
									},
								});
							}}
						/>
					</Form.Group>
					<Form.Group>
						<Input
							label="(선택) 광고성 정보 수신"
							type="checkbox"
							checked={formData.agreements.advertisement}
							onChange={(e) => {
								return changeFormData({
									agreements: {
										...formData.agreements,
										advertisement: e.target.checked,
									},
								});
							}}
						/>
					</Form.Group>
				</div>
			</div>
		</Modal.Body>
	);
};

SurveyModalBody.Step2 = ({ formData, changeFormData }) => {
	const [isUsedGoorm, setIsUsedGoorm] = useState(undefined);

	const toggleIsUsedGoorm = () => {
		setIsUsedGoorm((usedGoorm) => {
			return !usedGoorm;
		});
	};

	return (
		<Modal.Body>
			<div className={cn(styles.container)}>
				<div className={cn(styles.container__header)}>
					<Typography token="h5">
						구름 서비스 이용 경험을 알려주세요.
					</Typography>
					<Typography token="caption">
						더 좋은 챌린지가 될 수 있도록 데이터를 수집하려고 해요.
					</Typography>
				</div>
				<div className={cn(styles.container__step2__body)}>
					<div className={cn(styles.container__step2__body__ele)}>
						<Label required>1. SW학과를 전공하셨나요?</Label>
						<Form.Group>
							<div className={cn(styles.container__step2__btns)}>
								<Button
									color="basic"
									size="lg"
									block
									value={formData.isMajor}
									active={formData.isMajor}
									onClick={() => {
										return changeFormData({
											isMajor: true,
										});
									}}
								>
									전공
								</Button>
								<Button
									color="basic"
									size="lg"
									block
									value={!formData.isMajor}
									active={!formData.isMajor}
									onClick={() => {
										return changeFormData({
											isMajor: false,
										});
									}}
								>
									비전공
								</Button>
							</div>
						</Form.Group>
					</div>
					<div className={cn(styles.container__step2__body__ele)}>
						<Label required>
							2. 구름 서비스를 사용해본 적이 있나요?
						</Label>
						<Form.Group>
							<div className={cn(styles.container__step2__btns)}>
								<Button
									color="basic"
									size="lg"
									block
									value={formData.goorm.useGoorm}
									active={formData.goorm.useGoorm}
									onClick={() => {
										return changeFormData({
											goorm: {
												...formData.goorm,
												useGoorm: true,
											},
										});
									}}
								>
									예
								</Button>
								<Button
									color="basic"
									size="lg"
									block
									value={!formData.goorm.useGoorm}
									active={!formData.goorm.useGoorm}
									onClick={() => {
										return changeFormData({
											goorm: {
												...formData.goorm,
												useGoorm: false,
											},
										});
									}}
								>
									아니오
								</Button>
							</div>
						</Form.Group>
					</div>
					{formData.goorm.useGoorm && (
						<>
							<div
								className={cn(
									styles.container__step2__body__ele,
								)}
							>
								<Label>
									2-1. 사용 경험이 있는 서비스를 선택해주세요.
									(복수 선택 가능)
								</Label>
								<div
									className={cn(
										styles.container__step2__checkboxes,
									)}
								>
									<div
										className={cn(
											styles.container__step2__checkbox,
										)}
									>
										{CONSTANT.SERVICE_LIST_1.map(
											(service) => {
												return (
													<Form.Group>
														<Input
															key={service}
															value={
																formData.goorm
																	.service[
																	service
																]
															}
															label={`구름${service}`}
															type="checkbox"
															block
															checked={
																formData.goorm
																	.service[
																	service
																]
															}
															onChange={(e) => {
																return changeFormData(
																	{
																		goorm: {
																			...formData.goorm,
																			service:
																				{
																					...formData
																						.goorm
																						.service,
																					[service]:
																						e
																							.target
																							.checked,
																				},
																		},
																	},
																);
															}}
														/>
													</Form.Group>
												);
											},
										)}
									</div>

									<div
										className={cn(
											styles.container__step2__checkbox,
										)}
									>
										{CONSTANT.SERVICE_LIST_2.map(
											(service) => {
												if (!service)
													return <div></div>;
												return (
													<Form.Group>
														<Input
															key={service}
															value={
																formData.goorm
																	.service[
																	service
																]
															}
															label={`구름${service}`}
															type="checkbox"
															block
															checked={
																formData.goorm
																	.service[
																	service
																]
															}
															onChange={(e) => {
																return changeFormData(
																	{
																		goorm: {
																			...formData.goorm,
																			service:
																				{
																					...formData
																						.goorm
																						.service,
																					[service]:
																						e
																							.target
																							.checked,
																				},
																		},
																	},
																);
															}}
														/>
													</Form.Group>
												);
											},
										)}
									</div>
								</div>
							</div>
							<div
								className={cn(
									styles.container__step2__body__ele,
								)}
							>
								<Label>
									2-2. 해당 서비스를 사용하게 된 이유는
									무엇인가요?
								</Label>
								<TextArea
									placeholder="ex. 구름톤 챌린지에 참여하기 위해 레벨 서비스를 사용해봤습니다."
									resize="vertical"
									rows={CONSTANT.TEXTAREA_ROWS}
									value={formData.goorm.reason}
									onChange={(e) => {
										return changeFormData({
											goorm: {
												...formData.goorm,
												reason: e.target.value,
											},
										});
									}}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</Modal.Body>
	);
};

SurveyModalBody.Step3 = ({ formData, changeFormData }) => {
	return (
		<Modal.Body>
			<div className={cn(styles.container)}>
				<div className={cn(styles.container__header)}>
					<Typography token="h5">
						오프라인 팀 챌린지에 가장 기대하는 점은 무엇인가요?
					</Typography>
					<Typography token="caption">
						더 좋은 챌린지가 될 수 있도록 데이터를 수집하려고 해요.
					</Typography>
				</div>
				<div className={cn(styles.container__step3__body)}>
					{CONSTANT.EXPECT_LIST.map((expect) => {
						return (
							<Form.Group>
								<Button
									color="basic"
									size="lg"
									block
									content="start"
									value={formData.expects[expect]}
									active={formData.expects[expect]}
									onClick={() => {
										return changeFormData({
											expects: {
												...formData.expects,
												[expect]:
													!formData.expects[expect],
											},
										});
									}}
								>
									{expect}
								</Button>
							</Form.Group>
						);
					})}
				</div>
			</div>
		</Modal.Body>
	);
};

SurveyModalBody.Step4 = ({ formData, changeFormData }) => {
	return (
		<Modal.Body>
			<div className={cn(styles.container)}>
				<div className={cn(styles.container__header)}>
					<Typography token="h5">
						구름톤 챌린지에 전하고 싶은 말을 적어주세요.
					</Typography>
					<Typography token="caption">
						더 좋은 챌린지가 될 수 있도록 데이터를 수집하려고 해요.
					</Typography>
				</div>
				<div className={cn(styles.container__body)}>
					<TextArea
						placeholder="ex.&#10;다음 번 챌린지에서는 더 어려운 문제가 출제되면 좋겠어요.&#10;오프라인 과제가 다양했으면 좋겠어요."
						resize="vertical"
						rows={CONSTANT.TEXTAREA_ROWS}
						value={formData.review}
						onChange={(e) => {
							return changeFormData({
								review: e.target.value,
							});
						}}
					/>
				</div>
			</div>
		</Modal.Body>
	);
};
export default SurveyModalBody;
