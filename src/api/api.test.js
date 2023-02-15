import axios from 'axios';
jest.mock('axios');

import { getData } from './api.js';

describe('api call', () => {
	describe('getData', () => {
		it('calls axios.get with EA codingTest URL', async () => {
			axios.get.mockImplementation(() =>
				Promise.resolve({ data: { some: 'data' } }),
			);
			const data = await getData();

			expect(axios.get).toHaveBeenCalledWith(
				'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals',
			);

			expect(data).toEqual({ some: 'data' });
		});
	});

	it('Throws an error if there is an error', async () => {
		axios.get.mockImplementation(() => {
			throw 'Errrrorrrr';
		});

		try {
			const data = await getData();
		} catch (error) {
			expect(axios.get).toHaveBeenCalledWith(
				'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals',
			);
			expect(error).toBe('Errrrorrrr');
		}
	});
});
