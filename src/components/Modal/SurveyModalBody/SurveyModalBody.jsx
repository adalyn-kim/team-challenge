import { useEffect } from 'react';
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
	setFormDataWithKey,
	currentStep,
	setIsValid,
}) => {
	const CurrentInputGroup = SurveyModalBody[`Step${currentStep + 1}`];

	return (
		<div className={styles.ConfirmChallengerInfo__inputList}>
			<CurrentInputGroup
				formData={formData}
				setFormDataWithKey={setFormDataWithKey}
				setIsValid={setIsValid}
			/>
		</div>
	);
};

SurveyModalBody.Step1 = ({ setIsValid }) => {
	useEffect(() => {
		setIsValid(true);
	}, []);

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
						<Input placeholder="이름을 입력해주세요." />
					</Form.Group>
					<Form.Group>
						<Label required type="tel">
							전화번호
						</Label>
						<Input placeholder="ex. 01012345678" />
					</Form.Group>
					<Form.Group>
						<Label required type="email">
							이메일
						</Label>
						<Input placeholder="ex. goormee@goorm.io" />
					</Form.Group>
				</div>

				<div className={cn(styles.container__footer)}>
					<Form.Group>
						<Input label="전체 동의" type="checkbox" />
					</Form.Group>
					<Form.Group>
						<Input
							label="(필수) 개인정보처리방침"
							type="checkbox"
						/>
					</Form.Group>
					<Form.Group>
						<Input
							label="(선택) 마케팅 목적의 개인 정보 수집 및 이용"
							type="checkbox"
						/>
					</Form.Group>
					<Form.Group>
						<Input
							label="(선택) 광고성 정보 수신"
							type="checkbox"
						/>
					</Form.Group>
				</div>
			</div>
		</Modal.Body>
	);
};

SurveyModalBody.Step2 = ({ setIsValid }) => {
	useEffect(() => {
		setIsValid(true);
	}, []);

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
								<Button color="basic" size="lg" block>
									전공
								</Button>
								<Button color="basic" size="lg" block>
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
								<Button color="basic" size="lg" block>
									예
								</Button>
								<Button color="basic" size="lg" block>
									아니오
								</Button>
							</div>
						</Form.Group>
					</div>
				</div>
			</div>
		</Modal.Body>
	);
};

SurveyModalBody.Step3 = () => {
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
					<Form.Group>
						<Button color="basic" size="lg" block content="start">
							1. (예시) 정해진 시간 내에 오프라인 팀 챌린지 과제를
							수행
						</Button>
					</Form.Group>
					<Form.Group>
						<Button color="basic" size="lg" block content="start">
							2. (예시) 정해진 시간 내에 오프라인 팀 챌린지 과제를
							수행
						</Button>
					</Form.Group>
					<Form.Group>
						<Button color="basic" size="lg" block content="start">
							3. (예시) 정해진 시간 내에 오프라인 팀 챌린지 과제를
							수행
						</Button>
					</Form.Group>
					<Form.Group>
						<Button color="basic" size="lg" block content="start">
							4. (예시) 정해진 시간 내에 오프라인 팀 챌린지 과제를
							수행
						</Button>
					</Form.Group>
				</div>
			</div>
		</Modal.Body>
	);
};

SurveyModalBody.Step4 = () => {
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
					/>
				</div>
			</div>
		</Modal.Body>
	);
};
export default SurveyModalBody;
