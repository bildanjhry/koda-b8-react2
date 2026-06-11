import { useState, useEffect } from 'react'
import './index.css'

function SearchInput({handleSearch}) {
  return (
      <>
        <form 
        onSubmit={handleSearch}
        action="" className='w-full h-[3.3rem] items-center flex flex-row justify-between'>
          <input 
          placeholder="Type a character's name.."
          className='w-[89%] h-[100%] bg-white rounded-md pl-4 pr-4 text-slate-800'
          type="search" name="name" id="name" />
          <button 
          type='submit'
          className='w-[10%] cursor-pointer flex justify-center items-center 
          bg-[#7b80a0] hover:bg-slate-500 h-[100%] rounded-md'>
            <img src="../public/search-icon.png" alt="" className='w-5 h-5'/>
          </button>
        </form>
      </>    
  )
}

function CardList({datas, loading}) {

  function handleChooseCard(e){
    const card = e.target.parentElement
    console.log(card)
  }

  return (
    <div className='w-full flex gap-4 flex-wrap mt-2'>
      {
      loading ?
      <SkeletonCardList/> :
      datas?.map((item, index) => ((
          <div 
          key={index}
          onClick={(e) => {handleChooseCard(e)}}
          className='md:h-[20rem] h-[17rem] w-[11rem] bg-[#7b80a0] md:w-[16.1rem] rounded-md flex flex-col 
          cursor-pointer hover:scale-110'>
            <img src={item?.image} alt="" className='w-full h-[80%] rounded-t-md' />
            <div className='w-full h-[20%] flex justify-center items-center'>
              <h4 className='text-slate-100 font-semibold'>{item.name}</h4>
            </div>
          </div>
        )))}
    </div>
  )
}

function SkeletonCardList(){
  return(
    <div className='w-full flex gap-4 flex-wrap'>
        <div className='md:h-[20rem] h-[17rem] w-[11rem] bg-[#5d617a] md:w-[16.1rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
          </div>
        </div> 

        <div className='md:h-[20rem] h-[17rem] w-[11rem] bg-[#5d617a] md:w-[16.1rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
          </div>
        </div> 

        <div className='md:h-[20rem] h-[17rem] w-[11rem] bg-[#5d617a] md:w-[16.1rem] 
          rounded-md flex flex-col cursor-pointer animate-pulse
          hover:scale-x-100'>
          <div className='w-full h-[80%] bg-[#7b80a0] rounded-t-md'></div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <span className='w-[60%] h-[15px] bg-[#7b80a0] rounded-md animate-pulse'></span>
          </div>
        </div>

        <div className='md:h-[20rem] h-[17rem] w-[11rem] bg-[#5d617a] md:w-[16.1rem] 
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
    <div className='w-full h-fit flex flex-col items-center justify-content mt-2 mb-12'>
      <div className='w-[80%] gap-6 flex flex-col items-center h-fit'>
        <h1 className=' text-4xl'>Rick & Morty's Characters</h1>
        <SearchInput handleSearch={handleSearch} />
        {datas ? 
        <CardList datas={datas} loading={loading}/>
        : 
        <div className='flex w-full gap-4 items-center justify-center'>
            <img src="../public/search.png" alt="" className='w-8 h-8 mt-10' />
           <h2 className='pt-10 justify-self-center'>Opps character not found</h2>
        </div>
       }
      </div>
    </div>
  )
}

export default App
