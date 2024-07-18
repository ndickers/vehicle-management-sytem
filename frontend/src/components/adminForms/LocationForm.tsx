export default function LocationForm({ setShowLocationForm }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowLocationForm(false);
        }
      }}
      className="bg-black opacity-80 z-10 h-[100%] w-[100%] top-0 left-0  absolute p-32"
    >
      <h1 className="text-center text-2xl font-bold mb-6">Add location</h1>
      <form action="" className="mb-8 m-auto flex flex-col max-w-[25rem]">
        <input className="update-form " type="text" placeholder="name" />
        <input className="update-form " type="number" placeholder="phone" />
        <input className="update-form" type="text" placeholder="address" />
        <button className="submit-btn ">
          post location
        </button>
      </form>
    </div>
  );
}
