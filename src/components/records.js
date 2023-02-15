import React, { useEffect, useState } from 'react';
import { getData } from '../api/api.js';
import {
	groupedRecordLabel,
	makePrintable,
	flattenData,
} from '../mapping/formatter.js';

import { RecordRow, IndentedRow } from '../styles.js';

export const InfoHeader = () => (
	<div id="info-header">
		<RecordRow>
			Energy Australia test
			<br />
			The semantic is tried to be the same as example:
			<br /> Record label
			<IndentedRow>
				Band
				<IndentedRow>
					Festival
					<br />
					Festival
				</IndentedRow>
			</IndentedRow>
		</RecordRow>
		<br />
		<br />
	</div>
);

export const RecordsComponent = () => {
	const [recordData, setRecordData] = useState([]);

	useEffect(() => {
		getData().then((data) =>
			setRecordData(makePrintable(groupedRecordLabel(flattenData(data)))),
		);
	}, []);
	return (
		<div id="record-components">
			<InfoHeader />
			{recordData.map((rd) => (
				<RecordRow id="record-label-entry" key={rd}>
					<div>{rd.recordLabel}</div>
					<div>
						{rd.bands.map((band) => (
							<IndentedRow key={band}>
								<div>{band.band}</div>
								<div>
									{band.festivals.map((festival) => (
										<IndentedRow>
											{festival.festival && (
												<div>{festival.festival}</div>
											)}
										</IndentedRow>
									))}
								</div>
							</IndentedRow>
						))}
					</div>
				</RecordRow>
			))}
		</div>
	);
};
