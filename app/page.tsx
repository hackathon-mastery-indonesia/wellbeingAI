'use client'

import axios from "axios";
import RecommendationEtiquetteBar from "./component/RecommendationEtiquetteBar/RecommendationEtiquetteBar";
import SearchBar from "./component/SearchBar/SearchBar";
import SidebarLayout from "./layout/SidebarLayout";
import { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';


function Home() {
  const situationEtiquette = [
    'Etika Chat Dosen',
    'Etika Menyampaikan Pendapat',
    'Etika Berkunjung ke Rumah Orang Lain'
  ]
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
                <span className="text-blue-500">EtiquetteAI: </span>Pemandu Etika dan Etiket yang Interaktif & Kolaboratif Pakai AI
              </h1>
            </div>
            
            <div className="flex flex-col max-w-3xl mx-auto">
            <p className="mx-auto text-black text-sm text-justify mb-2">
            EtiquetteAI adalah platform yang menyediakan panduan komprehensif tentang etiket dalam berbagai situasi, tempat, dan daerah untuk masyarakat Indonesia. Kami tidak hanya berhenti di situ; EtiquetteAI dilengkapi dengan chatbot pembelajaran etiket, quiz studi kasus etiket, dan kemampuan untuk menganalisis etiket berdasarkan komentar di internet.
            </p>
            <p className="mx-auto text-black text-sm text-justify">
            Dengan EtiquetteAI, Anda dapat menjelajahi panduan etiket yang relevan, mempraktikkannya dalam situasi sehari-hari, dan meningkatkan pemahaman Anda melalui interaksi dengan chatbot yang ramah dan uji pengetahuan yang menarik. Dengan fokus pada pembelajaran yang interaktif dan berdaya guna, Etiquette hadir untuk membantu Anda menciptakan budaya etika yang lebih baik dalam kehidupan sehari-hari. Bergabunglah dengan kami dan mulailah perjalanan Anda menuju perilaku yang lebih sopan dan sadar etika bersama Etiquette!
            </p>
            </div>
            <div className="w-full flex flex-col items-center  mt-6 max-w-3xl mx-auto">
               <h1 className="text-center mx-auto  text-3xl font-bold text-blue-400 mb-4">
                <span className="text-black">Pelajari Etiket atau Etika yang Anda Cari dengan</span> Prompt
              </h1>
                <p className="mx-auto mb-2 text-black text-sm text-justify">
                EtiquetteAI menggunakan kombinasi teknologi LLM, Text-to-Video, Text-to-Speech,  Speech-to-Text, dan Vector Similarity Search untuk membuat konten pembelajaran etika yang interaktif dan kolaboratif berdasarkan prompt yang diketikkan pengguna.
                </p>
                <button onClick={()=>{
                  router.push('/cari')
                }} className="text-white bg-blue-500 text-center px-4 py-2 font-bold text-sm md:text-base rounded-full">Mulai Prompt Sekarang</button>   
                
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
