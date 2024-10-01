import { Link } from "react-router-dom";
import unDrawImg from "../assets/undraw-img.svg";
import logo from "../assets/logo.svg";
import telegramIcon from "../assets/Telegram_black.svg";
import viber from "../assets/Viber.svg";
import viber1 from "../assets/Viber1.svg";
import call from "../assets/Call.svg";
import emailIcon from "../assets/Union.svg";
import { Button, Navbar } from "flowbite-react";
export default function LandingPage() {
  return (
    <div>
      <section className="md:p-16 lg:p-24 p-4 text-white h-[100vh]" id="home">
        <div className="max-w-[1000px] mx-auto">
          <header className="flex justify-between items-center">
            <Navbar
              fluid
              rounded
              className="bg-black w-[100vw]  md:px-16 md:py-8  fixed left-1 top-1"
            >
              <Navbar.Brand>
                <img
                  src={logo}
                  className="mr-3 h-12  sm:h-9"
                  alt="vehicle Rental System Logo"
                />
              </Navbar.Brand>
              <div className="flex items-center gap-x-3 md:order-2 mr-1">
                <Link
                  to={"/login/user"}
                  className=" md:btns text-sm border-2 px-2 border-white rounded-xl hover:text-black hover:bg-white"
                >
                  login
                </Link>
                <Link
                  to={"/register"}
                  className="md:btns text-sm bg-white px-2 py-1 rounded-xl text-black hover:bg-transparent hover:border-2 hover:text-white hover:border-white"
                >
                  Get started
                </Link>

                <Navbar.Toggle className="hover:bg-[#BB8C5F]" />
              </div>
              <Navbar.Collapse>
                <Navbar.Link
                  className="link-btn text-white hover:text-[#BB8C5F]"
                  href="#home"
                >
                  Home
                </Navbar.Link>
                <Navbar.Link
                  className="link-btn text-white hover:text-[#BB8C5F]"
                  href="#about"
                >
                  About
                </Navbar.Link>
                <Navbar.Link
                  className="link-btn text-white hover:text-[#BB8C5F]"
                  href="#contact"
                >
                  Contact
                </Navbar.Link>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <div className="w-[65%]  md:w-[40%] mt-32">
            <h1 className="text-3xl md:text-5xl font-bold leading-normal">
              Welcome to Our Vehicle Rental Service
            </h1>
          </div>
        </div>
      </section>
      <section id="about" className="bg-black pb-4 md:pb-36">
        <div className="max-w-[1000px] mx-auto text-white pt-12">
          <h2 className="text-4xl font-bold my-16 text-center">About us</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-[40%] my-auto">
              <p className="leading-loose m-4">
                At Ndickers car rental, we are more than just a car rental
                company. We are your travel companion, your road trip partners
                and your ticket to exploration.
              </p>
            </div>
            <img src={unDrawImg} alt="" />
          </div>
        </div>
      </section>

      <section id="contact">
        <h2 className="text-4xl font-bold my-16 text-white text-center">
          Contact
        </h2>
        <div className="flex w-full justify-between px-32 py-28">
          <div className="flex w-[50%] pl-12 gap-24 ">
            <div className="text-white opacity-70">
              <img src={logo} alt="" />
              <p className="mt-12 ml-8">254 car higher</p>
            </div>
            <div className="text-white  flex flex-wrap justify-between gap-x-16 gap-y-4 w-[15rem]">
              <a className="hover:text-[#BB8C5F]" href="http://">
                discount
              </a>
              <a className="hover:text-[#BB8C5F]" href="http://">
                help
              </a>
              <a className="hover:text-[#BB8C5F]" href="http://">
                promocode
              </a>
              <a className="hover:text-[#BB8C5F]" href="#about">
                about us
              </a>
              <a className="hover:text-[#BB8C5F]" href="#home">
                home
              </a>
            </div>
          </div>
          <div className="w-[50%] pl-36">
            <div>
              <div className="flex gap-4">
                <div className="flex gap-4 items-center text-white ">
                  <img src={call} alt="" />
                  <p>0768665354</p>
                </div>
                <div className="flex gap-2 ">
                  <img src={viber} alt="" />
                  <img src={telegramIcon} alt="" />
                  <img src={viber1} alt="" />
                </div>
              </div>
              <p className="text-white opacity-50 mt-4">24 hours operational</p>
            </div>
            <div className="flex mt-8 text-white gap-4">
              <img src={emailIcon} alt="" />
              bryondickers@gmail.com
            </div>
          </div>
        </div>
      </section>

      {/* add contact page */}
    </div>
  );
}
