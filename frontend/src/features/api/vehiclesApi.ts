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
//"https://vehicle-management-sytem.onrender.com"
export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-management-sytem.onrender.com/",
    prepareHeaders: addingHeader,
  }),
  tagTypes: ["Vehicle", "Location", "Fleet", "User", "Report", "Booking"],
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => "/vehicles",
      providesTags: ["Vehicle"],
    }),
    getLocation: builder.query({
      query: () => "/location",
      providesTags: ["Location"],
    }),
    getFleet: builder.query({
      query: () => "/fleet-management",
      providesTags: ["Fleet"],
    }),
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: [{ type: "User", id: "ID" }],
    }),
    getReports: builder.query({
      query: (id) => `/customer-support/${id}`,
      providesTags: [{ type: "Report", id: "ID" }],
    }),
    getBookings: builder.query({
      query: (id) => `/bookings/user/${id}`,
      providesTags: [{ type: "Booking", id: "ID" }],
    }),
    getAllReports: builder.query({
      query: () => `/customer-support`,
      providesTags: ["Report"],
    }),
    createVehicle: builder.mutation({
      query: (vehicle) => ({
        url: "/vehicles",
        method: "POST",
        body: vehicle,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    confirmRegistration: builder.mutation({
      query: (token) => ({
        url: "/confirm-registration",
        method: "POST",
        body: token,
      }),
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    createVehicleSpec: builder.mutation({
      query: (vehicleSpec) => ({
        url: "/vehicle-specification",
        method: "POST",
        body: vehicleSpec,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    createBooking: builder.mutation({
      query: (bookings) => ({
        url: "/bookings",
        method: "POST",
        body: bookings,
      }),
      invalidatesTags: ["Booking"],
    }),
    createLocation: builder.mutation({
      query: (location) => ({
        url: "/location",
        method: "POST",
        body: location,
      }),
      invalidatesTags: ["Location"],
    }),

    registerUser: builder.mutation({
      query: (userDetails) => ({
        url: "/register",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["User"],
    }),
    createReport: builder.mutation({
      query: (report) => ({
        url: "/customer-support",
        method: "POST",
        body: report,
      }),
      invalidatesTags: ["Report"],
    }),
    updateUser: builder.mutation({
      query: ({ user, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [{ type: "User", id: "ID" }],
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateLocation: builder.mutation({
      query: ({ location, id }) => ({
        url: `/location/${id}`,
        method: "PUT",
        body: location,
      }),
      invalidatesTags: [{ type: "Location", id: "ID" }],
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicle, id }) => ({
        url: `/vehicles/${id}`,
        method: "PUT",
        body: vehicle,
      }),
      invalidatesTags: [{ type: "Vehicle", id: "ID" }],
    }),
    deleteFleet: builder.mutation({
      query: (id) => ({
        url: `/fleet-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fleet"],
    }),
    createFleet: builder.mutation({
      query: (fleet) => ({
        url: "/fleet-management",
        method: "POST",
        body: fleet,
      }),
      invalidatesTags: ["Fleet"],
    }),
    updateFleet: builder.mutation({
      query: ({ fleet, id }) => ({
        url: `/fleet-management/${id}`,
        method: "PUT",
        body: fleet,
      }),
      invalidatesTags: [{ type: "Fleet", id: "ID" }],
    }),

    updateReport: builder.mutation({
      query: ({ report, id }) => ({
        url: `/customer-support/${id}`,
        method: "PUT",
        body: report,
      }),
      invalidatesTags: [{ type: "Report", id: "ID" }],
    }),
    updateBooking: builder.mutation({
      query: ({ book, id }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: [{ type: "Booking", id: "ID" }],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/customer-support/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Report"],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
    resetPass: builder.mutation({
      query: (email: { email: string }) => ({
        url: "reset-password",
        method: "POST",
        body: email,
      }),
    }),
    updatePass: builder.mutation({
      query: (resetDetails: { token: string; password: string }) => ({
        url: "new-password",
        method: "PUT",
        body: resetDetails,
      }),
    }),
    createCheckout: builder.mutation({
      query: (bookingList) => ({
        url: "/checkout",
        method: "POST",
        body: bookingList,
      }),
      invalidatesTags: ["Booking"],
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
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateFleetMutation,
  useCreateFleetMutation,
  useDeleteLocationMutation,
  useResetPassMutation,
  useDeleteUserMutation,
  useUpdateLocationMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useUpdatePassMutation,
  useCreateUserMutation,
  useDeleteReportMutation,
  useUpdateBookingMutation,
  useUpdateReportMutation,
  useGetReportsQuery,
  useCreateReportMutation,
  useGetUserQuery,
  useCreateCheckoutMutation,
  useCreateBookingMutation,
  useGetVehiclesQuery,
  useGetLocationQuery,
  useConfirmRegistrationMutation,
  useCreateVehicleSpecMutation,
  useCreateVehicleMutation,
  useCreateLocationMutation,
} = vehicleApi;
