import { flattenData, groupedRecordLabel, makePrintable } from './formatter.js';
import { SAMPLE } from './__fixture__/sample_festivals.js';

describe('Formatter', () => {
	describe('flatten data', () => {
		it('formats data according to spec', () => {
			const flatData = flattenData(SAMPLE);

			expect(flatData[0].bandName).toBe('Squint-281');
			expect(flatData).toMatchSnapshot();
		});
	});

	describe('groupRecordLabel', () => {
		it('groups data based on record labelaccording to spec', () => {
			const flatData = flattenData(SAMPLE);
			const grouped = groupedRecordLabel(flatData);
			expect(grouped).toMatchSnapshot();
			expect(grouped[0]).toEqual({
				bands: [
					{
						bandName: 'Manish Ditch',
						festival: 'Trainerella',
						recordLabel: 'ACR',
					},
					{
						bandName: 'Critter Girls',
						festival: undefined,
						recordLabel: 'ACR',
					},
				],
				recordLabel: 'ACR',
			});
			expect(Array.isArray(grouped[0].bands)).toBe(true);
		});

		it('sorts based on recordLabel', () => {
			const flatData = flattenData(SAMPLE);
			const grouped = groupedRecordLabel(flatData);
			expect(grouped.map((g) => g.recordLabel)).toEqual([
				'ACR',
				'Anti Records',
				'Fourth Woman Records',
				'MEDIOCRE Music',
				'Marner Sis. Recording',
				'Monocracy Records',
				'Outerscope',
				'Pacific Records',
				'Still Bottom Records',
				'XS Recordings',
				'Unknown recorder',
			]);
		});
	});
	describe('makePrintable', () => {
		it('matches the requested output', () => {
			const flatData = flattenData(SAMPLE);
			const grouped = groupedRecordLabel(flatData);
			const printable = makePrintable(grouped);

			expect(printable).toMatchSnapshot();
		});

		it('sorts bands by bandname', () => {
			const flatData = flattenData(SAMPLE);
			const grouped = groupedRecordLabel(flatData);
			const printable = makePrintable(grouped);

			expect(printable[0].bands.map((p) => p.band)).toEqual([
				'Critter Girls',
				'Manish Ditch',
			]);

			expect(printable[1].bands.map((p) => p.band)).toEqual(['YOUKRANE']);
		});
	});
});
