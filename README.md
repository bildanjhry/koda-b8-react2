# Rick & Morty Characters set

Kumpulan lis dari karakter-karakter Rick & Morty. Program ini mengkonsumsi data melalui Open API Rick & Morty yang di Map kedalam aplikasi berbasis React dan terdapat fungsi mencari karakter sesuai nama.

### Url : https://rickandmortyapi.com/api/character

Tech Stacks:
- React JS
- TailwindCss

## Function search:
```jsx
  function handleSearch(e){
    e.preventDefault()
    const data = new FormData(e.target)
    const q = data.get("search")
    
    setSearchParams(() =>{ // set query base on input search
        return {q}
    })
  }
```

### Watching search Params:
```jsx
 // watching searchParams and take the value
 useEffect(() => {
    function getQuery(){
      const name = searchParams.get("q")
      if(name) {
        setReloadParams(name)
        ref.current.value = name
      }
    }
    getQuery()
 },[searchParams])
```

### Fetch API:
```jsx
  useEffect(() => {
    async function getData(count = 3){
      try{
        setLoading(true) // start mounting loading

        let apiUrl = `https://rickandmortyapi.com/api/character`
        if(reloadParams) apiUrl = `https://rickandmortyapi.com/api/character?name=${reloadParams}`

        const res = await fetch(apiUrl)
        const data = await res.json()

        setDatas(data.results)
        setLoading(false) // unmount loading
      } catch(err){
         if(count >= 1) getData(count-1) // will retry 3 times if error happend
         return console.error(err)
      }
    } 
    getData()

  },[setDatas, setLoading, reloadParams, searchParams, setReloadParams])
```

### Preview Demo
| Cari semua ✅                       | Cari berdasarkan name ✅            |
|:------------------------------------|-------------------------------------:|
| ![alt text](src/assets/image.png)   | ![alt text](src/assets/image-1.png)            ||
|                                     |  
| Skeleton saat data sedang diload    |  Tidak ditemukan
| ![alt text](src/assets/ske-image.png)|  ![alt text](src/assets/image-not-found.png) |