import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="h-[100vh]" id="register">
      <div>
        <h1 className="text-center text-white text-3xl font-bold mb-4">
          Register
        </h1>

        <form action="" className=" mb-8 m-auto flex flex-col max-w-[25rem]">
          <input className="form-input" type="text" placeholder="username" />
          <input className="form-input" type="email" placeholder="email" />
          <input className="form-input" type="text" placeholder="phone" />
          <input className="form-input" type="text" placeholder="address" />
          <input
            className="form-input"
            type="password"
            placeholder="password"
          />
          <input
            className="form-input"
            type="password"
            placeholder="confirm password"
          />

          <button className="bg-black opacity-70 p-3 mt-3 rounded-lg text-white text-lg font-semibold">
            Register
          </button>
        </form>
        <Link
          to={"/login/user"}
          className="text-white text-center hover:text-[#CAC326] block underline"
        >
          login here
        </Link>
      </div>
    </div>
  );
}
