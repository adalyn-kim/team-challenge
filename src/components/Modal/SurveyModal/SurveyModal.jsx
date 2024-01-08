import { useState } from 'react';
import cn from 'classnames';

import { Button, CarouselIndicators, Modal } from '@goorm-dev/gds-challenge';

import CONSTANTS from '../constants';
import SurveyModalBody from '../SurveyModalBody';

import styles from './SurveyModal.module.scss';

const SurvayModal = ({ isOpen, handleToggle }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [isSubmit, setIsSubmit] = useState(false);
	const [isValid, setIsValid] = useState(false);

	// 현재 step이 끝났다면 제출하기 버튼, 아니면 다음 버튼 그리기
	const getNextButtonText = (isSubmitPageIndex) => {
		return isSubmitPageIndex ? '제출하기' : '다음';
	};

	// 모달 이전 버튼 눌렀을 경우 현재 스탭 제어
	const moveToPrevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	// 모달 다음 버튼 눌렀을 경우 현재 스탭 제어
	const moveToNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	return (
		<Modal isOpen={isOpen} toggle={handleToggle}>
			<Modal.Header toggle={handleToggle} />
			<SurveyModalBody
				currentStep={currentStep}
				setIsValid={setIsValid}
			/>
			<Modal.Footer between>
				<CarouselIndicators
					activeIndex={currentStep}
					length={CONSTANTS.LAST_STEP}
				/>
				<div className={cn(styles.footer__btns)}>
					{currentStep !== 0 && !isSubmit && (
						<Button
							color="link"
							size="lg"
							onClick={moveToPrevStep}
							className="mr-2"
						>
							이전
						</Button>
					)}
					<Button
						size="lg"
						onClick={() => {
							if (currentStep === CONSTANTS.SUBMIT_INDEX) {
								// submitSurveyModal();
							} else {
								moveToNextStep();
							}
						}}
						disabled={!isValid}
					>
						{getNextButtonText(
							currentStep === CONSTANTS.SUBMIT_INDEX,
						)}
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default SurvayModal;
