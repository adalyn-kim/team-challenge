import { useState } from 'react';

import { Card, EmptyView, Header, SurveyModal } from '@/components';

import styles from './App.module.scss';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	// 모달의 toggle 'X' button 제어하는 함수
	const handleToggle = () => {
		// 'X' button 클릭 시 modal closed
		setIsOpen((prevOpen) => {
			return !prevOpen;
		});
		setToggle((prevToggle) => {
			return !prevToggle;
		});
	};

	// 모달 다음 버튼 눌렀을 경우

	const moveToPrevStep = () => {
		setCurrentStep(currentStep - 1);
	};
	const moveToNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	return (
		<div className={styles.App}>
			<Header setIsOpen={setIsOpen} />
			<main className={styles.main}>
				<EmptyView />
				{isOpen && (
					<SurveyModal isOpen={isOpen} handleToggle={handleToggle} />
				)}
			</main>
		</div>
	);
}

export default App;
