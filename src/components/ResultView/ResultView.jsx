import cn from 'classnames';

import { Card } from '@/components';

import { Typography } from '@goorm-dev/gds-challenge';

import styles from './ResultView.module.scss';

const ResultView = ({ participantsInfo }) => {
	return (
		<>
			<Card padding="md" className={cn(styles.resultView__header)}>
				<Typography color="dark" token="h6">
					응답한 참여자 :
				</Typography>
				<Typography color="primary" token="h6">
					{participantsInfo.data.length}
				</Typography>
			</Card>
			{participantsInfo.data.map((participant, idx) => {
				return (
					<Card pointer>
						<Typography token="h6">
							참여자 {idx + 1} : {participant.name}
						</Typography>
					</Card>
				);
			})}
		</>
	);
};

export default ResultView;
