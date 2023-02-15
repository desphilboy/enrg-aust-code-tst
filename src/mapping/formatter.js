import { DEFAULT_RECORDER } from './constants.js';
import _ from 'lodash';

export const flattenData = (festivalData) =>
	(festivalData || []).reduce((acc, fd) => {
		fd.bands?.forEach((band) => {
			acc = [
				...acc,
				{
					recordLabel: band.recordLabel || DEFAULT_RECORDER,
					bandName: band.name,
					festival: fd.name,
				},
			];
		});
		return acc;
	}, []);

export const sortRls = (a, b) => {
	if (a.recordLabel === DEFAULT_RECORDER) {
		return 1;
	}
	if (b.recordLabel === DEFAULT_RECORDER) {
		return -1;
	}
	return a.recordLabel > b.recordLabel ? 1 : -1;
};

export const groupedRecordLabel = (flatData) =>
	_.chain(flatData)
		// Group the elements of Array based on recordlabel
		.groupBy('recordLabel')
		.map((value, key) => ({ recordLabel: key, bands: value }))
		.value()
		.sort(sortRls);

export const makePrintable = (grpData) =>
	grpData.map(({ recordLabel, bands }) => ({
		recordLabel,
		bands: _.chain(bands)
			.groupBy('bandName')
			.map((value, key) => ({ band: key, festivals: value }))
			.value()
			.sort((a, b) => {
				return a.bandName > b.bandName ? 1 : -1;
			}),
	}));
