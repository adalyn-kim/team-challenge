import { useEffect, useState } from 'react';

import { EmptyView, Header, ResultView, SurveyModal } from '@/components';

import styles from './App.module.scss';
import { createParticipant, getParticipantsList } from './api/apis';

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
		isMajor: undefined,
		goorm: {
			useGoorm: undefined,
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
	}); // 설문조사 데이터 저장을 위한 formData 상태
	const [isOpen, setIsOpen] = useState(false); // modal 열고닫기를 위한 상태
	const [participantsInfo, setParticipantsInfo] = useState({
		isLoading: false,
		data: [],
	}); // 설문조사 참여자 리스트 저장을 위한 상태
	const [flagForFetch, setFlagForFetch] = useState(false); // 제출 후 result view 리렌더링을 위한 상태
	console.log(participantsInfo);

	/**
	 * 전체 참가자 정보를 가져오는 함수
	 */
	const getAllParticipantsInfo = async () => {
		try {
			setParticipantsInfo({
				isLoading: true,
				isError: false,
				data: participantsInfo.data,
			});
			const response = await getParticipantsList();

			setParticipantsInfo({
				isLoading: false,
				isError: false,
				data: response.data,
				error: null,
			});
		} catch (error) {
			setParticipantsInfo({
				isLoading: false,
				isError: true,
				data: [],
				error,
			});
			console.log({ error });
		}
	};
	console.log(participantsInfo);

	/**
	 * 화면이 redering 될 때 전체 참가자 정보를 가져오는 useEffect
	 */
	useEffect(() => {
		getAllParticipantsInfo();
	}, [flagForFetch]);

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
			isMajor: undefined,
			goorm: {
				useGoorm: undefined,
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
				// 확인하기 편하게 이렇게 하는게 좋은지 함수로 빼는게 좋은지
				setFlagForFetch((submit) => {
					return !submit;
				});
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
				{participantsInfo.data.length ? (
					<ResultView participantsInfo={participantsInfo} />
				) : (
					<EmptyView />
				)}
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
