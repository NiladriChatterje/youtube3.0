import { Box, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'
import { options } from '../../../App'


const genre =['music','now','games','movies']

const Trending = () => {
const [localData,setLocalData] = React.useState(()=>[])
const [genres,setGenre] = React.useState(()=>'music')
const navigate = useNavigate();

React.useEffect(()=>{
  let isMounted= true;
  if(isMounted){
    async function fetchTrendData(genres){
      const response = await fetch('https://youtube-v3-alternative.p.rapidapi.com/trending?geo=IN&type='+genres,options)
      const {data} = await response.json();
      console.log(data);
      setLocalData(data)
    }
   fetchTrendData(genres);
  }

  return ()=>{isMounted=false}
},[genres]);

  return (
    <Flex 
      
      fontWeight={800}
      w={'full'}
      flexWrap={'wrap'}
      justifyContent='center'
      >
        <Flex w={'full'} flexWrap={'wrap'} justifyContent={'center'} bg={'black'} pos={'sticky'} >
          {genre?.map((item,i)=><Text
          cursor={'pointer'} mt={2} mb={2} fontSize={'xx-small'}
          key={i} bg={'red'} borderRadius={15} 
          ml={2} mr={2} pl={3} pr={3}
          onClick={()=>setGenre(item)}>{item}</Text>)}
        </Flex>
        {localData?.map((item,i)=>
        <Flex key={i}
        borderRadius={15}
        m={8}
        pos={'relative'}
        onMouseEnter={()=>{
          Array.from(document.getElementsByClassName('description'))[i].style.visibility='visible'
        }}
        onMouseLeave={()=>{
          Array.from(document.getElementsByClassName('description'))[i].style.visibility='hidden'
        }}
          w={240}
          h={400}>
          <ReactPlayer 
          controls
          url={`https://www.youtube.com/watch?v=${item.videoId}`}
          height={'100%'}/>

          <Box
          pos={'absolute'}
            bottom={0}
            bg={'white'}
            color={'black'}
            visibility={'hidden'}
            className='description'
            transition={'all'}
            transitionDuration={'200ms'}
            h={100}
            w={'full'}
            overflowY={'auto'}>
              <Text w={'fit-content'} cursor={'pointer'} onClick={(e)=>{
                e.stopPropagation();
                navigate(`/ChannelDetails/${item.channelId}`);
                            }} >{item.channelTitle}</Text>

          <Flex w={'full'} justifyContent={'space-between'}>
            <Text>{item.viewCount}</Text>
            <Text>{item.lengthText}</Text>
            </Flex>
            <Text wordBreak={'break-word'} fontSize={'x-small'} >
              {item.description}
            </Text>
          </Box>
        </Flex>)}
      

    </Flex>
  )
}

export default Trending;