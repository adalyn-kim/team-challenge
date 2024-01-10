import axios from 'axios';

const HOST_NAME = 'https://devel-basic-test-api.run.goorm.io';

/**
 * 전체 참여자 리스트 가져오기
 * @returns
 */
export async function getParticipantsList() {
	const { data } = await axios.get('/api/applicant');

	return data;
}

/**
 * 특정 지원자 정보 조회
 * @param {Object} participantInfo
 * @returns
 */
export async function getParticipantInfo({ participantInfo }) {
	const { name, phone, email } = { participantInfo };
	const { data } = await axios.get('/api/applicant', name, phone, email);

	return data;
}

/**
 * 지원자의 설문조사 등록, 지원자 생성
 * @param {Object} surveyInfo
 * @returns
 */
export async function createParticipant({ surveyInfo }) {
	console.log('surveyInfo >>>', surveyInfo);
	try {
		const data = await axios.post(`${HOST_NAME}/api/applicant`, surveyInfo);
		localStorage.setItem('surveyInfo', JSON.stringify(surveyInfo));
		alert('설문조사 제출에 성공 했습니다');
		console.log('data ', data);
		return data;
	} catch (error) {
		alert('설문조사 저장에 실패했습니다.');
		console.error(error);
	}
}
