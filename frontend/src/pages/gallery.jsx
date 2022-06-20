// import Header from "../components/Header";
import{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import{ toast } from 'react-toastify'


function Gallery(){
    const API_KEY = '563492ad6f91700001000001bc543c3f2c624c7abb851b8563bd4b0f1'
    // const[pageIndex, setpageIndex] = useState(1)
    let [perPage, setperPage] = useState(12)
    const[URL, setUrl] = useState(`https://api.pexels.com/v1/curated?per_page=${perPage}`)
    let[loading, setLoading]= useState(false)
    let [photos, setphotos] = useState([])
    let user = useSelector(state => state.user.value)
    let navigate = useNavigate()

    if(user===null){navigate('/login')}
  
        let storeText=useSelector((state) => {return state.text})

        async function fetchImages(){
            try{  let res = await fetch(URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/Json',
                    Authorization: API_KEY
                }
            })
            let data = await res.json()
            // console.log(data)
            setphotos(data.photos)
            setLoading(true)
            console.log(photos)}
          
            catch (error){ toast.error('check your internet connection and try again')}
               
            
            // return data
        }
        useEffect(() => {
            fetchImages()
        },[URL])

        useEffect(() => {
            setphotos([])
            if (storeText.value.length>0){
                            setUrl(`https://api.pexels.com/v1/search?query=${storeText.value}&per_page=${perPage}`)
            }
            // console.log('zinta')
            setLoading(false)
        },[storeText])
    function loadMore(){
        if(storeText.value.length > 0){
        setperPage(perPage + 12)
       
        setUrl(`https://api.pexels.com/v1/search?query=${storeText.value}&per_page=${perPage + 12}`)
       }else{
        setperPage(perPage + 12)
        setUrl(`https://api.pexels.com/v1/curated?per_page=${perPage + 12}`)
       }
    setLoading(false) }
    return(
      <>
      {/* <Header /> */}
       <div className="gallery">
           {
photos.map((photo) => {
    return (
        <div className="item" key={photo.id}>
            <img src={photo.src.medium} alt=""/>
            <h3>{photo.photographer}</h3>
        </div>
    )
})
           } 
           {/* <div className="item">
          <a href="http">
            <img src="images/2.jpg" alt="image"/>
            <h3>Unknown</h3>
          </a>
       </div>   */}
        
       </div>
             {/* <a href="he" class="load-more" data-img="curated" >Load More</a> */}
             <button type="button"
             class="load-more"
             data-img="curated"
             onClick={loadMore}>
                 {loading ? 'Load More' : 'Loading. . .'}
             </button>
         
      </>
    )
}

export default Gallery