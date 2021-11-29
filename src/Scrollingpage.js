import { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';

const PAGE_NUMBER=1;

export default function TitlebarBelowImageList() {
    const[state,setState]=useState([])
    const[page,setPage]=useState(PAGE_NUMBER)
    
    useEffect(()=>{
        fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&size=5`)
        .then(res=>res.json())
         .then(json=>setState([...state, ...json.data]))
    },[page])

    // const fetchPhotos=async(page)=>{
    //     const res=await fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=10`)
    //     const data=await res.json()
    //     console.log(data)
    // }

    // useEffect(()=>{
    //     fetchPhotos(page)
    // },[page])
    console.log(state)

   const scrollEnd =()=>{
       setPage(page +1)
   } 

    window.onscroll=function (){
        if(
            window.innerHeight+document.documentElement.scrollTop === document.documentElement.offsetHeight
        ){
            scrollEnd()
        }
    }
  return (
      <Container>
    <ImageList sx={{ width: 800, height: 450 }}>
          {state.length> 0 && state.map((item,i)=>(
            <div className="photo" key={i}>
                <img src={item.images.small} alt="error"/>
                <h3>{item.name}</h3>
                <p>Attack:{item.set.name}</p>
                <p>Availbility:{item.set.ptcgoCode}</p>
            </div>
        ))}
    </ImageList>
    </Container>
    
  );
}

