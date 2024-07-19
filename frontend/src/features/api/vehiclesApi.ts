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
    getLocation: builder.query({
      query: () => "/location",
    }),
    createVehicle: builder.mutation({
      query: (vehicle) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicle,
      }),
    }),
    createVehicleSpec: builder.mutation({
      query: (vehicleSpec) => ({
        url: "/vehicle-specification",
        method: "POST",
        body: vehicleSpec,
      }),
    }),
    createLocation: builder.mutation({
      query: (location) => ({
        url: "/location",
        method: "POST",
        body: location,
      }),
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetLocationQuery,
  useCreateVehicleSpecMutation,
  useCreateVehicleMutation,
  useCreateLocationMutation,
} = vehicleApi;
