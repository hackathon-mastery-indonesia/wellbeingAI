'use client'

import axios from "axios";
import SearchBar from "./component/SearchBar/SearchBar";
import SidebarLayout from "./layout/SidebarLayout";
import { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';


function Home() {

  const [text,setText] = useState<string>('')
  const router = useRouter()
   
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start  pt-12 pb-10 bg-white px-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
      <div className="w-full flex flex-col max-w-5xl mx-auto">
    
      <div className="w-full flex flex-col mt-8">
          <div className="w-full max-w-3xl mx-auto flex mb-4">
              <h1 className="text-center mx-auto  text-3xl font-bold text-black mb-4">
                <span className="text-blue-500">WellnessAI: </span>A Companion for a Healthier Physical and Mental Lifestyle through Collaborative AI.
              </h1>
            </div>
            
            <div className="flex flex-col max-w-3xl mx-auto">
            <p className="mx-auto text-black text-sm text-justify mb-2">
            WellnessAI is a platform that provides a comprehensive guide to physical and mental health through collaboration with artificial intelligence. We dont stop there; WellnessAI is equipped with a virtual health learning assistant and interactive health case study quizzes.
            </p><p className="mx-auto text-black text-sm text-justify">
            With WellnessAI, you can explore relevant health guidelines and implement them in your daily life. With a focus on interactive and beneficial learning, WellnessAI is here to help you create an overall healthier lifestyle. Join us and start your journey towards better health with WellnessAI!
            </p>
            </div>
            <div className="w-full flex flex-col items-center  mt-6 max-w-3xl mx-auto">
               <h1 className="text-center mx-auto  text-3xl font-bold text-blue-400 mb-4">
                <span className="text-black">Learn the Health Guidelines You Want with</span> Prompt
              </h1>
                <p className="mx-auto mb-2 text-black text-sm text-justify">
                WellnessAI utilizes a combination of LLM technology and Vector Similarity Search to create interactive and collaborative health learning content based on user-entered prompts.
                </p><button onClick={()=>{
                  router.push('/prompt')
                }} className="text-white bg-blue-500 text-center px-4 py-2 font-bold text-sm md:text-base rounded-full">Start Prompting Now</button>   
                
            </div>
      </div>

      </div>
      
      
    </main>
  );
}

export default function Page (){
  return <SidebarLayout>
    <Home/>
  </SidebarLayout>
}
