import cn from 'classnames';

import { Button, Typography } from '@goorm-dev/gds-challenge';

import styles from './Header.module.scss';

const Header = ({ setIsOpen }) => {
	return (
		<header className={cn(styles.header)}>
			<div className={cn(styles.contents)}>
				<Typography token="h5">
					구름톤 챌린지 참여자 정보 수집
				</Typography>
				<Button
					size="lg"
					onClick={() => {
						setIsOpen((open) => {
							return !open;
						});
					}}
				>
					설문조사 참여하기
				</Button>
			</div>
		</header>
	);
};

export default Header;
