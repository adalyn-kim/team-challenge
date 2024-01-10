import { useState } from 'react';

import { EmptyView, Header, SurveyModal } from '@/components';

import styles from './App.module.scss';

function App() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		agreements: {
			personal: false,
			marketing: false,
			advertisement: false,
		},
		isMajor: false,
		goorm: {
			useGoorm: false,
			service: {
				EDU: false,
				LEVEL: false,
				DEVTH: false,
				IDE: false,
				EXP: false,
			},
			reason: '',
		},
		expects: {
			1: false,
			2: false,
			3: false,
			4: false,
		},
		review: '',
	});
	const [isOpen, setIsOpen] = useState(false);

	/**
	 * Modal 내 formData들의 event를 감지하여 formData를 업데이트 시켜주는 함수
	 * @param {Object} newFormData
	 */
	const changeFormData = (newFormData) => {
		setFormData({ ...formData, ...newFormData });
	};

	/**
	 * Modal에서 전체동의에 대한 체크박스를 관리하는 함수
	 * @param {Object} checkAll
	 */
	const checkAllAgreements = (checkAll) => {
		const allAgreements = {
			personal: checkAll,
			marketing: checkAll,
			advertisement: checkAll,
		};

		setFormData({
			...formData,
			agreements: { ...allAgreements },
		});
	};

	// 모달의 toggle 'X' button 제어하는 함수
	const handleToggle = () => {
		// 'X' button 클릭 시 modal closed
		setIsOpen((prevOpen) => {
			return !prevOpen;
		});
	};

	return (
		<div className={styles.App}>
			<Header setIsOpen={setIsOpen} />
			<main className={styles.main}>
				<EmptyView />
				{isOpen && (
					<SurveyModal
						isOpen={isOpen}
						handleToggle={handleToggle}
						formData={formData}
						changeFormData={changeFormData}
						checkAllAgreements={checkAllAgreements}
					/>
				)}
			</main>
		</div>
	);
}

export default App;
