import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { AiFillLike } from 'react-icons/ai';
import { GiWarlockEye } from 'react-icons/gi';
import ReactPlayer from 'react-player';
import { Link, useParams,useNavigate } from 'react-router-dom';
import {options, SideBar,URL2} from '../../App'
import Card from '../Body/Card/Card';

const URL = 'https://youtube-v3-alternative.p.rapidapi.com/video?id='
const URL3 = 'https://youtube-v3-alternative.p.rapidapi.com/comments?id='

const Reactplayer = () => {
    const navigate = useNavigate();
    const {setIsLoading} = React.useContext(SideBar)
    const [localData,setLocalData] = React.useState(()=>{});
    const [suggestions,setSuggestions] = React.useState(()=>[])
    const [localComments,setLocalComments]=React.useState(()=>[]);
    const {id} = useParams();
    
    React.useEffect(()=>{
      async function fetchVideoDetails(id){
        const response = await fetch(URL+id,options);
        const data = await response.json();
        setLocalData(data);
        console.log(data)
      }
      async function fetchDataHome(suggestedVideo){
        try{
        setIsLoading(true);
        const response = await fetch(URL2+suggestedVideo,options);
        const {data} = await response.json();
        setSuggestions(data);
        setIsLoading(false);
      console.log(data)}catch(err){}
      }
     
      async function fetchVideoComments(id){
        const response = await fetch(URL3+id,options);
        const {data} = await response.json();
        setLocalComments(data);
        console.log(data)
      }
      fetchVideoDetails(id);
      fetchVideoComments(id);
      fetchDataHome(id);
    },[id])

  return (
    <Flex
        flexDir={window.innerWidth<1200?'column':'row'}
        justifyContent={window.innerWidth<1200?'center':'left'}
        w='full'
        h='90vh'>
          <Box id='player'
              rowGap={'5%'}
              w={window.innerWidth<1200?'100%':'75%'}
              h={window.innerWidth<1200?'100%':'90vh'}
              overflowX={'clip'}
              overflowY={'auto'}>
          <ReactPlayer
            style={window.innerWidth<1200?{position:'fixed',zIndex:1}:{position:'static'}}
            controls={true}
            url ={`https://www.youtube.com/watch?v=${id}`}
            height={window.innerWidth<1200?'40%':'80%'}
            width={'100%'} />
            <Flex 
              justifyContent={'space-between'}>
                <Flex
                  alignItems={'center'} gap={5}>
                <GiWarlockEye color={'red'}/>
                <Text>views: {localData?.viewCount}</Text>
                </Flex>
            
            <Text>Runtime: {localData?.lengthSeconds}s</Text>
            </Flex>
            <Text fontSize={'xs'}>Uploaded: {localData?.publishDate}</Text>
          <Text  fontSize={'lg'}>{localData?.title}</Text>
          <Flex flexWrap={'wrap'}>
            {localData?.keywords?.map((item,i)=>(
                
                <span key={i} 
                style={{borderRadius:10,width:'max-content',
                margin:'5px',padding:'5px',fontSize:'0.8em',
                background:'rgb(250,50,55)'}} >
                  {item}</span>
              
          ))}</Flex>
          <Link to={`/ChannelDetails/${localData?.channelId}`}>
          <Text cursor={'pointer'} fontSize={'lg'} fontWeight={'900'}
           >{localData?.channelTitle}</Text>
           </Link>
          <Text fontSize={'xs'} fontWeight={'600'}>{localData?.description}</Text>
          
          {localComments?.map((item,i)=>(
            <Box
              key={i}
              mt={10}
              w={'full'}
            >
               <Divider />
              <Flex>
                <Image
                cursor={'pointer'}
                src={item?.authorProfileImageUrl[0]?.url}
                onClick={(e)=>{e.stopPropagation();
                             navigate(`/ChannelDetails/${item?.authorChannelId}`) }}
                style={{width:'40px',height:'40px',borderRadius:'50%'}}
                />
                <Box w={'full'}>
                    <Text fontWeight={900} fontSize={'0.9em'}
                   >{item.authorDisplayName}
                  </Text>
                    <Text fontSize={'0.8em'}>{item.textDisplay}</Text>
                    <Flex w='full' 
                    pr={10}
                    justifyContent={'space-between'} >
                      <Flex 
                      w={'max-content'}
                      flexDir={'row'}
                      >
                      <AiFillLike color='red' /><Text fontSize={'0.75em'}>Likes  : {item.likesCount}</Text>
                      </Flex>
                      <Text fontSize={'0.75em'}>Replies : &nbsp; &nbsp;&nbsp; {item.replyCount}</Text>
                    </Flex>
                    <Text fontSize={'0.7em'}>{item.publishedTimeText}</Text>
                </Box>
              </Flex>

            </Box>
          ))}
          </Box>
           <Flex id={'suggested'} 
           flexWrap={'wrap'}
           justifyContent={window.innerWidth<1200?'center':'left'}
           pos={window.innerWidth<1200?'relative':'static'}
           bottom={window.innerWidth<1200?'0':undefined}
           h={window.innerWidth<1200?'50%':'100%'}
            overflowY={'auto'} w={window.innerWidth<1200?'100%':'25%'} pt={5}>
           {suggestions?.map((item,i)=>{
                return (
                        <Card item={item} key={i} />
                )
            })}
           </Flex>
    </Flex>
  )
}

export default Reactplayer;