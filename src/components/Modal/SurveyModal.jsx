import cn from 'classnames';

import {
	Button,
	CarouselIndicators,
	Form,
	Input,
	Label,
	Modal,
	Typography,
} from '@goorm-dev/gds-challenge';

import styles from './SurveyModal.module.scss';

const SurvayModal = ({ isOpen, handleToggle }) => {
	return (
		<Modal isOpen={isOpen} toggle={handleToggle}>
			<Modal.Header toggle={handleToggle} />
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
			<Modal.Footer between>
				<CarouselIndicators activeIndex={0} length={4} />
				<Button size="lg">다음</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SurvayModal;
