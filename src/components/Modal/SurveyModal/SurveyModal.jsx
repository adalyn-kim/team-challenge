import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Button, CarouselIndicators, Modal } from '@goorm-dev/gds-challenge';

import CONSTANTS from '../constants';
import SurveyModalBody from '../SurveyModalBody';

import styles from './SurveyModal.module.scss';

/** @typedef FormData
 *  @property {string} name
 *  @property {string} phone
 *  @property {string} email
 *  @property {{ personal: boolean; marketing: boolean; advertisement: boolean; }} agreements
 *  @property {boolean} isMajor
 *  @property {{ useGoorm: boolean; service: { EDU: boolean; LEVEL: boolean; DEVTH: boolean; IDE: boolean; EXP: boolean }; reason: string; }} goorm
 *  @property {{ 1: boolean; 2: boolean; 3: boolean; 4: boolean;  }} expects
 *  @property {string} review
 */

/**
 *
 * @param {{ isOpen: boolean; handleToggle: () => void; formData: FormData; changeFormData: (newFormData: Partial<FormData>) => void }} props
 * @returns
 */
const SurvayModal = ({
	isOpen,
	handleToggle,
	formData,
	changeFormData,
	submitSurveyFormData,
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [isSubmit, setIsSubmit] = useState(false); // 제출여부 파악을 위한 state

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

	useEffect(() => {
		const activeStep = parseInt(
			localStorage.getItem('activeStep') || '0',
			10,
		);
		setCurrentStep(activeStep);
	}, []);

	return (
		<Modal isOpen={isOpen} toggle={handleToggle}>
			<Modal.Header toggle={handleToggle} />
			<SurveyModalBody
				formData={formData}
				changeFormData={changeFormData}
				currentStep={currentStep}
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
								submitSurveyFormData();
							} else {
								moveToNextStep();
							}
						}}
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
