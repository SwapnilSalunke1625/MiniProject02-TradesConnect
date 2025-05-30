import message from "../components/Assets/Icons/MessageIcon.png";
import theft from "../components/Assets/Icons/theft.png";
import home from "../components/Assets/Icons/HomeIcon.png";
import axios from "axios";

export default function RatingProjectPage() {

  const sendMail = async (e) => {
    e.preventDefault();
    await axios.post('/api/v1/users/sendMail',
      {
        email: e.target[0].value,
        zipCode: e.target[1].value,
        name: e.target[2].value // Add name field
      },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(response => {
      console.log(response.data);
    })
  }

  return (
    <>
      <div className=" w-full mt-10  ">

        <div className='flex items-center flex-col text-center'>

          {/* Header Section */}
          <div className="flex flex-col items-center  md:flex-row gap-5 md:gap-20 mb-10 px-2 md:px-5">

            <div className='text-lg font-bold lg:text-3xl text-center md:text-left px-2 md:px-0 text-stdBlue'>
              <h1 className="">Get free project</h1>
              <span className="text-color1"> cost information delivered </span>
              <span>to your inbox</span>
            </div>

            <div className="h-[180px] md:h-[200px] max-w-[700px] rounded-3xl bg-gradient-to-r from-gray-200 to-gray-300 border-2 border-gray-300 shadow-lg flex flex-col items-center gap-5 p-5 transition-all duration-300 transform hover:scale-100 hover:shadow-xl z-1 relative">
              <h1 className="text-xl md:text-3xl text-stdBlue font-bold relative group">
                Receive mail
                <span className="absolute bottom-0 left-0 w-0 h-0.5 rounded-full bg-color1 transition-all duration-300 group-hover:w-full"></span>
              </h1>

              <form onSubmit={sendMail}>
                <div className="flex gap-2">
                  <input
                    className="w-[200px] md:w-[300px] h-[35px] md:h-[45px] rounded-lg px-3 text-base md:text-base border border-gray-600 focus:outline-none focus:border-color1 mr-2 shadow-sm focus:shadow-md transition-all duration-200"
                    type="email"
                    placeholder="Email Address"
                  />
                  <input
                    className="w-[100px] md:w-[120px] h-[35px] md:h-[45px] rounded-lg pl-3 text-sm md:text-base border-gray-600 border focus:outline-none focus:border-color1 shadow-sm focus:shadow-md transition-all duration-200"
                    type="text"
                    placeholder="Zip Code"
                  />
                  <input
                    className="w-[100px] md:w-[120px] h-[35px] md:h-[45px] rounded-lg pl-3 text-sm md:text-base border-gray-600 border focus:outline-none focus:border-color1 shadow-sm focus:shadow-md transition-all duration-200"
                    type="text"
                    placeholder="Name"
                  />
                </div>

                <div className="relative left-10 md:left-20">
                  <button className="bg-stdBlue text-white text-base md:text-xl h-[40px] md:h-[45px] w-[100px] md:w-[150px] rounded-full font-bold hover:bg-color1 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 z-20">
                    Submit
                  </button>
                </div>
              </form>

            </div>

          </div>

          {/* How it Works Section */}
          <div className=" flex flex-col items-center justify-center  w-full text-center">
            <h2 className="text-xl md:text-3xl font-bold text-stdBlue md:mt-10 mt-0 mb-10">How it works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-5 ">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-stdBlue">
                <div className="h-[60px] flex items-center justify-center mb-4">
                  <img style={{ width: '50px', height: '50px' }} src={message} alt="Step 1 Icon" />
                </div>
                <h3 className="text-base md:text-2xl font-semibold mb-2">1. Tell us what your home needs</h3>
                <p className=" text-xs md:text-base max-w-[300px] text-justify text-black font-semibold px-2">
                  From routine maintenance and repairs to dream home renovations, we can help with any project big or small.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-stdBlue">
                <div className="h-[60px] flex items-center justify-center mb-4">
                  <img style={{ width: '40px', height: '60px' }} src={theft} alt="Step 2 Icon" />
                </div>
                <h3 className="text-xl md:2xl font-semibold mb-2">2. We&apos;ll match you with personalized solutions</h3>
                <p className="text-black font-semibold text-xs md:text-base max-w-[300px]   text-justify px-2">
                  See your price and book services in an instant. Or, request and compare quotes from highly rated pros near you.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-stdBlue">
                <div className=" h-[60px] flex items-center justify-center mb-4">
                  <img style={{ width: '100px', height: '60px' }} src={home} alt="Step 3" />
                </div>
                <h3 className="text-xl md:2xl font-semibold mb-2">3. Start to finish, we&apos;ve got you covered</h3>
                <p className="text-black font-semibold text-xs md:text-base max-w-[300px]  text-justify px-2">
                  When you book and pay with Angi, you&apos;re covered by our Happiness Guarantee. We&apos;ll cover your projects up to full
                  purchase price, plus limited damage protection.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}