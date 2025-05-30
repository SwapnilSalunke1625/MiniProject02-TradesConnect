// import React from 'react'

function Footer() {
  return (
    <>
      <div className="h-[250px] w-full pt-5  bg-gray-700 mt-10 ">
        <div className=" flex justify-around">
          <div className="h-[200px] w-[200px] rounded-2xl bg-black  ">
            <div className="h-[150px] text-white font-bold text-4xl flex flex-col justify-center items-center text-center">
              <h1>Trade</h1>
              <h1>Connect</h1>

            </div>
            <div className="h-[50px] bg-white rounded-b-2xl flex justify-center  text-center items-center ">
              <h1 className="text-color1 ml-2 font-bold">Connecting Skills with Opportunities.</h1>

            </div>


          </div>
          <div>
            <h1 className="text-2xl font-bold text-white ">Quick Links</h1>
            <div className="flex justify-center flex-col  text-lg text-white font-semibold ">
              <h1 className="mt-2">Home</h1>
              <h1>About us</h1>
              <h1>Services</h1>
              <h1>Login</h1>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white text-center">Contact us</h1>
            <div className="mt-3">
              <div className="flex  gap-5 text-lg text-white font-semibold" >
                <i class="fa-solid fa-envelope"></i>
                <h1> tradeconnect@gmail.com</h1>
              </div>
              <h1 className="text-lg text-white font-semibold"><i className="fa-solid fa-phone mr-3"></i> <span>+91 1800 130 200 </span></h1>
              <h1 className="text-lg text-white font-semibold"><i className="fa-brands fa-youtube mr-3"></i><span>www.TradeConnect.youtube.com</span></h1>

            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Footer