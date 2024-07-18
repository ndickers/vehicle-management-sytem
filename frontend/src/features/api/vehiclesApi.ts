import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-management-sytem.onrender.com",
  }),
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => "/vehicles",
    }),
    createVehicle: builder.mutation({
      query: (vehicle) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicle,
      }),
    }),
  }),
});

export const { useGetVehiclesQuery, useCreateVehicleMutation } = vehicleApi;
