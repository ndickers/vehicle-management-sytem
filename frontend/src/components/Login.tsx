import { Link } from "react-router-dom";
export default function Login({ title }) {
  return (
    <div id="login" className="h-[100vh] flex justify-center items-center">
      <div className="">
        <h1 className="text-center text-white text-3xl font-bold mb-4">
          {title}
        </h1>

        <form action="" className="mb-16 m-auto flex flex-col max-w-[30rem]">
          <input className="form-input" type="email" placeholder="email" />
          <input
            className="form-input"
            type="password"
            placeholder="password"
          />
          <button className="bg-black opacity-70 p-3 rounded-lg text-white text-lg font-semibold">
            Login
          </button>
        </form>
        {title === "User" && (
          <Link
            to={"/register"}
            className="text-white text-center block hover:text-[#CAC326] underline"
          >
            register here
          </Link>
        )}
      </div>
    </div>
  );
}
