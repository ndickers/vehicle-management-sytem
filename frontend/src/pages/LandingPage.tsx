import { Link } from "react-router-dom";
import unDrawImg from "../assets/undraw-img.svg";
import logo from "../assets/logo.svg";
export default function LandingPage() {
  return (
    <div>
      <section className="p-24 text-white h-[100vh]" id="home">
        <div className="max-w-[1000px] mx-auto">
          <header className="flex justify-between items-center">
            <img src={logo} alt="" srcset="" />
            <div className="w-[55%] justify-between flex items-center">
              <nav>
                <ul className="list-none flex items-center gap-5">
                  <li>
                    <a className="link-btn" href="#home">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="link-btn" href="#about">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="link-btn" href="http://">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center gap-8">
                <Link
                  to={"/login/user"}
                  className=" btns border-2 border-white  hover:text-black hover:bg-white"
                  href="http://"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="btns py-3 bg-white text-black hover:bg-transparent hover:border-2 hover:text-white hover:border-white"
                  href="http://"
                >
                  Register
                </Link>
              </div>
            </div>
          </header>
          <div className=" w-[40%] mt-32">
            <h1 className="text-5xl font-bold leading-normal">
              Welcome to Our Vehicle Rental Service
            </h1>
          </div>
        </div>
      </section>
      <section id="about" className="bg-black pb-36">
        <div className="max-w-[1000px] mx-auto text-white pt-12">
          <h2 className="text-4xl font-bold my-16 text-center">About us</h2>
          <div className="flex justify-between">
            <div className="w-[40%] my-auto">
              <p className="leading-loose">
                At Ndickers car rental, we are more than just a car rental
                company. We are your travel companion, your road trip partners
                and your ticket to exploration.
              </p>
            </div>
            <img src={unDrawImg} alt="" srcset="" />
          </div>
        </div>
      </section>

      {/* add contact page */}
    </div>
  );
}
