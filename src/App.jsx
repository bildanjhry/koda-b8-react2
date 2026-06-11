import { useState, useEffect } from 'react'
import './index.css'

function SearchInput(handleSearch) {
  
  return (
      <>
        <form 
        onSubmit={(e) => handleSearch(e)}
        action="" className='w-full h-[3.5rem]'>
          <input 
          placeholder="Type a character's name.."
          className='w-[90%] h-[100%] bg-white rounded-l-md pl-4 text-slate-800'
          type="search" name="name" id="name" />
          <button 
          type='submit'
          className='w-[10%] bg-[black] h-[100%] rounded-r-md'>
            Search
          </button>
        </form>
      </>    
  )
}


function App() {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      async function getData(params){
        setLoading(true)
        let apiUrl = `https://rickandmortyapi.com/api/character`
        if(params) apiUrl = `https://rickandmortyapi.com/api/character?name=${params}`
        
        const res = await fetch(apiUrl)
        const data = await res.json()
        setDatas(data.results)
        setLoading(false)
      } 
      getData()
  },[setDatas, setLoading])
  
  function handleSearch(e){
    e.preventDefault()
  }

  return (
    <div className='w-full h-fit flex flex-col items-center justify-content mt-12'>
      <div className='w-[80%] bg-[yellow]  gap-6 flex flex-col items-center'>
        <h1>Rick & Morty's Characters</h1>
        <SearchInput handleSearch={handleSearch} />

        <div className='w-full flex gap-4 flex-wrap'>
            {
            !loading &&
            datas?.map((item, index) => ((
              <div 
              key={index}
              className='h-[20rem] bg-white w-[16rem] rounded-md flex flex-col'>
                  <img src={item?.image} alt="" className='w-full h-[80%] rounded-t-md' />
                  <div className='w-full h-[20%] flex justify-center items-center'>
                      <h4 className='text-slate-900 font-semibold'>{item.name}</h4>
                  </div>
              </div>
            )))}
        </div>

      </div>
    </div>
  )
}

export default App
