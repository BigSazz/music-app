import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPatch: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
		prepareHeaders: (headers) => {
			headers.set('X-RapidAPI-Key', '326ce475a0msh61132bd20fd6f9fp11166ajsn17895ba950ec');
			headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
			return headers;
		}
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => '/charts/world' }),
	})
});

export const { useGetTopChartsQuery } = shazamCoreApi;