import { useState } from 'react';

import { Card, EmptyView, Header, SurveyModal } from '@/components';

import styles from './App.module.scss';

function App() {
	const [isOpen, setIsOpen] = useState(false);

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
					<SurveyModal isOpen={isOpen} handleToggle={handleToggle} />
				)}
			</main>
		</div>
	);
}

export default App;
