import axios from 'axios';

const HOST_NAME = 'https://devel-basic-test-api.run.goorm.io';

/**
 * 전체 참여자 리스트 가져오기
 * @returns
 */
export async function getParticipantsList() {
	try {
		const { data } = await axios.get(`${HOST_NAME}/api/applicant`);
		return data;
	} catch (error) {
		console.error(error);
	}
}

/**
 * 특정 지원자 정보 조회
 * @param {string} id
 * @returns
 */
export async function getParticipantInfo({ id }) {
	const { data } = await axios.get('/api/applicant', id);

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
