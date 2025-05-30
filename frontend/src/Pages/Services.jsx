import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import service from "../components/Assets/service.png";
import serviceback from "../components/Assets/serviceback.png";

export default function Services() {
    return (
        <>
            <div className='h-[480px] w-full bg-black '>
                <img src={serviceback} alt="" />
                <p className='text-center mt-[-18rem] text-[30px] text-white font-semibold'>Your to-do list is here.</p>
            </div>
            <h1 className='text-center text-[32px] font-bold mt-10'>Hire a trusted Tasker</h1>
            {/* <Link to="/SearchService"> <button>search</button> <Link/> */}
            <Link to="/SearchService"> 
                <button className='border px-4 py-2 ml-5 text-color1 border-black rounded-md' >Search Temp</button>
             </Link>

            {/* main div */}

            <div className='mt-10 px-[5rem]'>

                <div id='first' className=' flex  justify-around '>

                    <div className='h-[750px] w-[300px]  rounded-md border border-black '>
                        <div className='h-[180px] w-full rounded-md'>
                            <img src={service} className='rounded-t-md' />
                        </div>
                        <div className='pl-4'>
                            <h1 className='text-color1 font-bold text-[20px] mt-5'>Featured Tasks</h1>
                            <p className=''>Let Taskers help tackle your to-do list.</p>
                            <button className='border-b-2 w-[250px]  border-gray-500 '></button>
                            <div className='flex flex-col list-none pl-2 '>
                                <li>Furniture Assembly</li>
                                <li>Home Repairs</li>
                                <li>Help Moving</li>
                                <li>Heavy Lifting</li>
                                <li>Home Cleaning</li>
                                <li>Spring Cleaning</li>
                                <li>Personal Assistant</li>
                                <li>Hang Art, Mirror & Decor</li>
                                <li>Yard Work Services</li>
                                <li>Wait in Line</li>
                            </div>
                        </div>
                    </div>

                    <div className='h-[750px] w-[300px]  rounded-md border border-black '>
                        <div className='h-[180px] w-full rounded-md'>
                            <img src={service} className='rounded-t-md' />
                        </div>
                        <div className='pl-4'>
                            <h1 className='text-color1 font-bold text-[20px] mt-5'>Handyman</h1>
                            <p className=''>Hire a Tasker for help around the house.</p>
                            <button className='border-b-2 w-[250px]  border-gray-500 '></button>
                            <div className='flex flex-col list-none pl-2'>
                                <li>Door, Cabinet, & Furniture Repair</li>
                                <li>Appliance Installation & Repairs</li>
                                <li>Furniture Assembly</li>
                                <li>TV Mounting</li>
                                <li>Drywall Repair Service</li>
                                <li>Flooring & Tiling Help</li>
                                <li>Electrical Help</li>
                                <li>Sealing & Caulking</li>
                                <li>Plumbing</li>
                                <li>Window & Blinds Repair</li>
                                <li>Ceiling Fan Installation</li>
                                <li>Smart Home Installation</li>
                                <li>Heavy Lifting</li>
                                <li>Install Air Conditioner</li>
                                <li>Painting</li>
                                <li>Install Shelves, Rods & Hooks</li>
                                <li>Home Maintenance</li>
                            </div>
                        </div>
                    </div>
                    <div className='h-[750px] w-[300px]  rounded-md border border-black '>
                        <div className='h-[180px] w-full rounded-md'>
                            <img src={service} className='rounded-t-md' />
                        </div>
                        <div className='pl-4'>
                            <h1 className='text-color1 font-bold text-[20px] mt-5'>Featured Tasks</h1>
                            <p className=''>Let Taskers help tackle your to-do list.</p>
                            <button className='border-b-2 w-[250px]  border-gray-500 '></button>
                            <div className='flex flex-col list-none pl-2'>
                                <li>Furniture Assembly</li>
                                <li>Home Repairs</li>
                                <li>Help Moving</li>
                                <li>Heavy Lifting</li>
                                <li>Home Cleaning</li>
                                <li>Spring Cleaning</li>
                                <li>Personal Assistant</li>
                                <li>Hang Art, Mirror & Decor</li>
                                <li>Yard Work Services</li>
                                <li>Wait in Line</li>
                            </div>
                        </div>
                    </div>

                </div>
                <div id='second' className=' flex  justify-around  my-14'>

                <div className='h-[750px] w-[300px]  rounded-md border border-black '>
                        <div className='h-[180px] w-full rounded-md'>
                            <img src={service} className='rounded-t-md' />
                        </div>
                        <div className='pl-4'>
                            <h1 className='text-color1 font-bold text-[20px] mt-5'>Featured Tasks</h1>
                            <p className=''>Let Taskers help tackle your to-do list.</p>
                            <button className='border-b-2 w-[250px]  border-gray-500 '></button>
                            <div className='flex flex-col list-none pl-2'>
                                <li>Furniture Assembly</li>
                                <li>Home Repairs</li>
                                <li>Help Moving</li>
                                <li>Heavy Lifting</li>
                                <li>Home Cleaning</li>
                                <li>Spring Cleaning</li>
                                <li>Personal Assistant</li>
                                <li>Hang Art, Mirror & Decor</li>
                                <li>Yard Work Services</li>
                                <li>Wait in Line</li>
                            </div>
                        </div>
                    </div>
                    <div className='h-[750px] w-[300px]  rounded-md border border-black '>
                        <div className='h-[180px] w-full rounded-md'>
                            <img src={service} className='rounded-t-md' />
                        </div>
                        <div className='pl-4'>
                            <h1 className='text-color1 font-bold text-[20px] mt-5'>Featured Tasks</h1>
                            <p className=''>Let Taskers help tackle your to-do list.</p>
                            <button className='border-b-2 w-[250px]  border-gray-500 '></button>
                            <div className='flex flex-col list-none pl-2'>
                                <li>Furniture Assembly</li>
                                <li>Home Repairs</li>
                                <li>Help Moving</li>
                                <li>Heavy Lifting</li>
                                <li>Home Cleaning</li>
                                <li>Spring Cleaning</li>
                                <li>Personal Assistant</li>
                                <li>Hang Art, Mirror & Decor</li>
                                <li>Yard Work Services</li>
                                <li>Wait in Line</li>
                            </div>
                        </div>
                    </div>
                    <div className='h-[750px] w-[300px]  rounded-md border border-black '>
                        <div className='h-[180px] w-full rounded-md'>
                            <img src={service} className='rounded-t-md' />
                        </div>
                        <div className='pl-4'>
                            <h1 className='text-color1 font-bold text-[20px] mt-5'>Featured Tasks</h1>
                            <p className=''>Let Taskers help tackle your to-do list.</p>
                            <button className='border-b-2 w-[250px]  border-gray-500 '></button>
                            <div className='flex flex-col list-none pl-2'>
                                <li>Furniture Assembly</li>
                                <li>Home Repairs</li>
                                <li>Help Moving</li>
                                <li>Heavy Lifting</li>
                                <li>Home Cleaning</li>
                                <li>Spring Cleaning</li>
                                <li>Personal Assistant</li>
                                <li>Hang Art, Mirror & Decor</li>
                                <li>Yard Work Services</li>
                                <li>Wait in Line</li>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}