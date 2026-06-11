import { useState, useEffect } from 'react'
import './index.css'

function SearchInput({handleSearch}) {
  return (
      <>
        <form 
        onSubmit={handleSearch}
        action="" className='w-full h-[3.5rem]'>
          <input 
          placeholder="Type a character's name.."
          className='w-[90%] h-[100%] bg-white rounded-l-md pl-4 pr-4 text-slate-800'
          type="search" name="name" id="name" />
          <button 
          type='submit'
          className='w-[10%] cursor-pointer  bg-slate-700 hover:bg-slate-500 h-[100%] rounded-r-md'>
            Search
          </button>
        </form>
      </>    
  )
}

function CardList({datas, loading}) {
  return (
    <div className='w-full flex gap-4 flex-wrap'>
      {
      loading ?
      <SkeletonCardList/> :
      datas?.map((item, index) => ((
          <div 
          key={index}
          className='h-[20rem] bg-white w-[16rem] rounded-md flex flex-col cursor-pointer hover:scale-x-100'>
            <img src={item?.image} alt="" className='w-full h-[80%] rounded-t-md' />
            <div className='w-full h-[20%] flex justify-center items-center'>
              <h4 className='text-slate-900 font-semibold'>{item.name}</h4>
            </div>
          </div>
        )))}
    </div>
  )
}

function SkeletonCardList(){
  return(
    <div className='w-full flex gap-4 flex-wrap'>
        <div className='h-[20rem] bg-[#5d617a] w-[16rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
          </div>
        </div> 

        <div className='h-[20rem] bg-[#5d617a] w-[16rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
          </div>
        </div> 

        <div className='h-[20rem] bg-[#5d617a] w-[16rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
          <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
        </div>

        </div> 
        <div className='h-[20rem] bg-[#5d617a] w-[16rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
          </div>
        </div>   

    </div>
  )
}

function App() {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(false)
  const [reloadParams, setReloadParams] = useState(false)

  useEffect(() => {
      async function getData(){
        setLoading(true)
        let apiUrl = `https://rickandmortyapi.com/api/character`
        if(reloadParams) apiUrl = `https://rickandmortyapi.com/api/character?name=${reloadParams}`
        const res = await fetch(apiUrl)
        const data = await res.json()
        setDatas(data.results)
        setLoading(false)
      } 
      getData()
  },[setDatas, setLoading, reloadParams, setReloadParams])
  
  function handleSearch(e){
    e.preventDefault()
    const data = new FormData(e.target)
    setReloadParams(data.get("name"))
  }

  return (
    <div className='w-full h-fit flex flex-col items-center justify-content mt-12'>
      <div className='w-[80%] gap-6 flex flex-col items-center h-fit'>
        <h1 className='mb-12'>Rick & Morty's Characters</h1>
        <SearchInput handleSearch={handleSearch} />
        {datas ? 
        <CardList datas={datas} loading={loading}/>
        : 
        <h2 className='pt-12 justify-self-center'>Opps character not found</h2>}
      </div>
    </div>
  )
}

export default App
