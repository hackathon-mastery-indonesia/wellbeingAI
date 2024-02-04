'use client'

import axios from "axios";
import SidebarLayout from "../layout/SidebarLayout";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import Loading from "../component/Loading/LoadingIcon";
import SearchBar from "../component/SearchBar/SearchBar";
import { IoClose } from "react-icons/io5";

type ArticlePreviewData = {
    id: string,
    title: string,
    json: any,
    categories: Array<string>
}

function HealthModule() {

  const [text,setText] = useState<string>('')
  const [afterFetch, setFirstFetch] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [categorySet, setCategorySet] = useState<Set<string>>(new Set());
  const [articles, setArticles] = useState<Record<string, ArticlePreviewData>>({})
  const [searchedArticles, setSearchedArticles] = useState<Record<string, ArticlePreviewData>>({})
  const [showSearchedArticles, setShowSearchedArticles] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  

  useEffect(()=>{
    fetch();
  },[])

  const fetch = async () => {
    setLoading(true)
   
    try {
        const queryString = `SELECT distinct a.id, a.title, a.json, c.name as category_name FROM ARTICLE a JOIN 
    ARTICLE_ARTICLE_CATEGORY aac ON a.id =  aac.articleId JOIN ARTICLE_CATEGORY c ON aac.categoryId = c.id;`
    const res = await axios.post('/api/db/query', {
        queryString: queryString
    })
    const data = res.data
    const rows = data.result.rows
    const updatedArticles : Record<string, ArticlePreviewData>= {}
    categorySet.add('All')
    rows.forEach((data: any )=>{
        categorySet.add(data.category_name)
        if(!updatedArticles[data.id]){
            updatedArticles[data.id] = {
                id:data.id,
                json: JSON.parse(data.json),
                title:data.title,
                categories:[data.category_name]
            }
        }
        else{
            updatedArticles[data.id].categories.push(data.category_name)
        }
    })
    setArticles(updatedArticles)
    
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
    setFirstFetch(true)
  }

 
   
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start overflow-y-auto pt-12 pb-10 bg-white px-4">
        {
            loading && <Loading/>
        }
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
      <div className="w-full flex flex-col max-w-5xl mx-auto">
         <div>
            <SearchBar onSearch={ async (text)=>{
                if(text.trim() == ''){
                    alert('text cant be empty')
                    return
                }
                setLoading(true)
                try {
                    const res = await axios.post('/api/health/get-embedding', {
                        searchTitle: text
                    })
                    const rows = res.data.rows
                    const updatedArticles : Record<string, ArticlePreviewData>= {}
                    rows.forEach((data:any)=>{
                        updatedArticles[data.id] = {
                            id:data.id,
                            title: data.title,
                            json: JSON.parse(data.json),
                            categories: []
                        }
                    })
                    setSearchedArticles(updatedArticles)
                    setShowSearchedArticles(true)
                } catch (error) {
                    console.log(error)
                    alert(error)
                }
                setLoading(false)


            }}/>
         </div>
        {
            showSearchedArticles && <div className="mt-4 flex flex-col w-full p-4 min-h-72 max-h-80 overflow-y-auto rounded-md bg-blue-600">
                <div className="flex w-full mb-2 justify-end text-sm text-white">
                        <IoClose onClick={()=>{
                            
                            setShowSearchedArticles(false)
                        }}/>
                </div>
                {
                     Object.values(searchedArticles).filter((article)=> selectedCategory == 'All' || article.categories.includes(selectedCategory)).map((article,index)=>{
                        return <div key={`${article.id} ${index}`}  className="flex flex-col mb-2 px-4 py-2 rounded-md bg-blue-100 text-black">
                            <h1 className="text-blue-600 mb-2 font-bold text-lg md:text-xl">{article.title}</h1>
                            <p className="text-blue-950 text-justify mb-2">{article.json.introduction}</p>
                            <div className="flex justify-end">
                             <div onClick={()=>{
                                router.push(`/content/${article.id}`)
                             }} className="px-3 py-2 bg-blue-300 text-lg text-black rounded-md">
                                Read
                             </div>
                            </div>
                        </div>
                    })
                }
            </div>
        }
      <div className="w-full flex flex-col mt-8 min-h-screen p-4 ">
            <div className="flex w-full flex-wrap items-center space-x-2 space-y-2 -ml-2 mb-4">
            <div></div>
            
                {
                    
                    Array.from(categorySet).map((category,index)=>{
                        return <div onClick={()=>{
                            setSelectedCategory(category)
                        }} key={`category-${category}-${index}`} className={`${selectedCategory == category? 'bg-blue-600': 'bg-blue-300'} font-bold  px-4 py-2 text-black text-center rounded-md`}>{category}</div>
                    })
                }
            </div>
          <div className="flex flex-col grow">
            {
                Object.values(articles).filter((article)=> selectedCategory == 'All' || article.categories.includes(selectedCategory)).map((article,index)=>{
                    return <div key={`${article.id} ${index}`}  className="flex flex-col mb-2 px-4 py-2 rounded-md bg-blue-100 text-black">
                        <h1 className="text-blue-600 mb-2 font-bold text-lg md:text-xl">{article.title}</h1>
                        <p className="text-blue-950 text-justify mb-2">{article.json.introduction}</p>
                        <div className="flex justify-end">
                         <div onClick={()=>{
                            router.push(`/content/${article.id}`)
                         }} className="px-3 py-2 bg-blue-300 text-lg text-black rounded-md">
                            Read
                         </div>
                        </div>
                    </div>
                })
            }{
               afterFetch && Object.values(articles).filter((article)=> selectedCategory == 'All' || article.categories.includes(selectedCategory)).length == 0 &&
                <div className="w-full mx-auto mt-2 rounded-md text-center font-bold bg-blue-300 text-black min-h-44 flex items-center justify-center">
                    <h1>
                    There are no modules related to the category
                    </h1>
                </div>
            }
          </div>
      </div>

      </div>
      
      
    </main>
  );
}

export default function Page (){
  return <SidebarLayout>
    <HealthModule/>
  </SidebarLayout>
}