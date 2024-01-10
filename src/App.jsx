import { useState } from 'react';

import { EmptyView, Header, SurveyModal } from '@/components';

import styles from './App.module.scss';
import { createParticipant } from './api/apis';

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
	 * @param {boolean} checkAll
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

	/**
	 * modal의 formData를 초기화 시켜주는 함수
	 * @returns
	 */
	const resetFormData = () => {
		return {
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
		};
	};

	/**
	 *
	 * @returns result
	 */
	const submitSurveyFormData = async () => {
		try {
			const result = await createParticipant({ surveyInfo: formData });
			if (result) {
				handleToggle(); // 제출 성공이면 모달 닫기
				setFormData(resetFormData()); // 모달의 form data 초기화
			}
			return result;
		} catch (error) {
			console.error(error);
		}
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
						submitSurveyFormData={submitSurveyFormData}
					/>
				)}
			</main>
		</div>
	);
}

export default App;
