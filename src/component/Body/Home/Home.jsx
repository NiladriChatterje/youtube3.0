import React from 'react'
import { SideBar,options,URL2 } from '../../../App';
import { Box, Flex, SkeletonCircle,SkeletonText } from '@chakra-ui/react';
import SkeletonLoader from '../SkeletonLoader';
import { useParams } from 'react-router-dom';
const Card = React.lazy(()=>import('../Card/Card'));

const URL1 = 'https://youtube-v3-alternative.p.rapidapi.com/search?query=';


const Home = () => {
    const {data,isLoading,setIsLoading,setData,suggestedVideo,query} = React.useContext(SideBar);
    const {category} = useParams();


    async function fetchData(category){
      setIsLoading(true);
      try{
      const response = await fetch(URL1+category,options);
      const {data} = await response.json();
      setData(data);
      setIsLoading(false)
      console.log(data)}catch(err){}}
    
     
    React.useEffect(()=>{
      if(query === ''){
      async function fetchDataHome(suggestedVideo){
        try{
        setIsLoading(true);
        const response = await fetch(URL2+suggestedVideo,options);
        const {data} = await response.json();
        setData(data);
        setIsLoading(false);
      console.log(data)}catch(err){}
      }
     
          if(category !== undefined || category !== '')
           { fetchData(category);}

          else{ fetchDataHome(suggestedVideo);}
  
          console.log(category);
        }
        else{
          fetchData(query)
        }
  },[category,query])  



  return (<>
    {isLoading?<SkeletonLoader />:
      <Flex
        id={'home'}
        w={'full'}
        h={'full'}
        justifyContent={'center'}
        overflowX={'hidden'}
        overflowY={'auto'}
        flexWrap={'wrap'}>
            {data?.map((item,i)=>{
                return (
                    <React.Suspense key={i} fallback={<Box padding='6' m={5} boxShadow='lg' bg='blackAlpha.400'>
                                                <SkeletonCircle size='10' />
                                                <SkeletonText m='20' noOfLines={4} spacing='4' />
                                            </Box>}>

                        <Card item={item} key={i} />
                    </React.Suspense>
                )
            })}
    </Flex>}
    </>)
}

export default Home