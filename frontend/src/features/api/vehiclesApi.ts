import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const addingHeader = (headers: any) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  if (role === "admin") {
    headers.set("Authorization", `${adminToken}`);
    return headers;
  }
  headers.set("Authorization", `${userToken}`);
  return headers;
};

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-management-sytem.onrender.com",
    prepareHeaders: addingHeader,
  }),
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => "/vehicles",
    }),
    getLocation: builder.query({
      query: () => "/location",
    }),
    getFleet: builder.query({
      query: () => "/fleet-management",
    }),
    getUsers: builder.query({
      query: () => `/users`,
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getReports: builder.query({
      query: (id) => `/customer-support/${id}`,
    }),
    getAllReports: builder.query({
      query: () => `/customer-support`,
    }),
    createVehicle: builder.mutation({
      query: (vehicle) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicle,
      }),
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    createVehicleSpec: builder.mutation({
      query: (vehicleSpec) => ({
        url: "/vehicle-specification",
        method: "POST",
        body: vehicleSpec,
      }),
    }),
    createBooking: builder.mutation({
      query: (bookings) => ({
        url: "/bookings",
        method: "POST",
        body: bookings,
      }),
    }),
    createLocation: builder.mutation({
      query: (location) => ({
        url: "/location",
        method: "POST",
        body: location,
      }),
    }),

    registerUser: builder.mutation({
      query: (userDetails) => ({
        url: "/register",
        method: "POST",
        body: userDetails,
      }),
    }),
    createReport: builder.mutation({
      query: (report) => ({
        url: "/customer-support",
        method: "POST",
        body: report,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ user, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/location/${id}`,
        method: "DELETE",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),

    updateLocation: builder.mutation({
      query: ({ location, id }) => ({
        url: `/location/${id}`,
        method: "PUT",
        body: location,
      }),
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicle, id }) => ({
        url: `/vehicles/${id}`,
        method: "PUT",
        body: vehicle,
      }),
    }),
    deleteFleet: builder.mutation({
      query: (id) => ({
        url: `/fleet-management/${id}`,
        method: "DELETE",
      }),
    }),
    createFleet: builder.mutation({
      query: (fleet) => ({
        url: "/fleet-management",
        method: "POST",
        body: fleet,
      }),
    }),
    updateFleet: builder.mutation({
      query: ({ fleet, id }) => ({
        url: `/fleet-management/${id}`,
        method: "PUT",
        body: fleet,
      }),
    }),

    updateReport: builder.mutation({
      query: ({ report, id }) => ({
        url: `/customer-support/${id}`,
        method: "PUT",
        body: report,
      }),
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/customer-support/${id}`,
        method: "DELETE",
      }),
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
    }),
    createCheckout: builder.mutation({
      query: (bookingList) => ({
        url: "/checkout",
        method: "POST",
        body: bookingList,
      }),
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useDeleteVehicleMutation,
  useUpdateVehicleMutation,
  useRegisterUserMutation,
  useDeleteFleetMutation,
  useGetFleetQuery,
  useUpdateFleetMutation,
  useCreateFleetMutation,
  useDeleteLocationMutation,
  useDeleteUserMutation,
  useUpdateLocationMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteReportMutation,
  useUpdateReportMutation,
  useGetReportsQuery,
  useCreateReportMutation,
  useGetUserQuery,
  useCreateCheckoutMutation,
  useCreateBookingMutation,
  useGetVehiclesQuery,
  useGetLocationQuery,
  useCreateVehicleSpecMutation,
  useCreateVehicleMutation,
  useCreateLocationMutation,
} = vehicleApi;
