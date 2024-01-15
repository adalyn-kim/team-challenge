import { useEffect, useRef, useState } from 'react';

import { EmptyView, Header, ResultView, SurveyModal } from '@/components';

import styles from './App.module.scss';
import { createParticipant, getParticipantsList } from './api/apis';

function App() {
	const outerRef = useRef(null); // 무한 스크롤 구현을 위한 ref
	const innerRef = useRef(null); // 무한 스크롤 구현을 위한 ref
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

	/**
	 * 전체 참가자 정보를 가져오는 함수
	 */
	const getAllParticipantsInfo = async () => {
		// 데이터 호출 중인데 또 스크롤 했을 때 중복 호출 막는 기능, throttle
		if (participantsInfo.isLoading) {
			return;
		}

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
				// data: [...participantsInfo.data, ...response.data], // 무한스크롤 시
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

	/**
	 * localStorage에 formData값이 있으면 거기서 가져와서 state formData 세팅
	 * 제출 전 reload 시 state의 휘발성을 고려하여 local storage에 중복 저장시킴
	 * 그리고 전체 참가자 정보를 가져오는 useEffect
	 *
	 */
	useEffect(() => {
		getAllParticipantsInfo();

		const storedFormData = JSON.parse(localStorage.getItem('formData'));

		const initialFormData = {
			name: '',
			phone: '',
			email: '',
			review: '',
			isMajor: undefined,
			agreements: {
				personal: false,
				marketing: false,
				advertisement: false,
			},
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
		};

		if (storedFormData) {
			setFormData({
				...initialFormData,
				...storedFormData,
				agreements: {
					...initialFormData.agreements,
					...storedFormData?.agreements,
				},
				goorm: {
					...initialFormData.goorm,
					...storedFormData?.goorm,
					service: {
						...initialFormData.goorm.service,
						...storedFormData?.goorm?.service,
					},
				},
				expects: {
					...initialFormData.expects,
					...storedFormData?.expects,
				},
			});
		} else {
			setFormData(initialFormData);
		}
	}, []);

	/**
	 * Modal 내 formData들의 event를 감지하여 formData를 업데이트 시켜주는 함수
	 * @param {Object} newFormData
	 */
	const changeFormData = (newFormData) => {
		setFormData({ ...formData, ...newFormData });
		localStorage.setItem(
			'formData',
			JSON.stringify({ ...formData, ...newFormData }),
		);
	};

	// 모달의 toggle 'X' button 제어하는 함수
	const handleToggle = () => {
		// 'X' button 클릭 시 modal closed
		setIsOpen((prevOpen) => {
			return !prevOpen;
		});
	};

	/**
	 * 제출하기 버튼 눌렀을 때 동작하는 함수
	 * @returns result
	 */
	const submitSurveyFormData = async () => {
		try {
			const result = await createParticipant({ surveyInfo: formData });
			if (result) {
				getAllParticipantsInfo(); // 리렌더링을 위해 재호출
				handleToggle(); // 제출 성공이면 모달 닫기
				setFormData({
					name: '',
					phone: '',
					email: '',
					review: '',
					isMajor: undefined,
					agreements: {
						personal: false,
						marketing: false,
						advertisement: false,
					},
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
				}); // 모달의 form data 초기화
				localStorage.clear(); // 로컬스토리지 초기화
			}
			return result;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.App}>
			<Header setIsOpen={setIsOpen} />
			<div
				className={styles.outer}
				ref={outerRef}
				onScroll={() => {
					if (
						outerRef.current.scrollTop +
							outerRef.current.clientHeight >
						innerRef.current.clientHeight
					) {
						getAllParticipantsInfo();
					}
				}}
			>
				<main className={styles.main} ref={innerRef}>
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
							submitSurveyFormData={submitSurveyFormData}
						/>
					)}
				</main>
			</div>
		</div>
	);
}

export default App;
