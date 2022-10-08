import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import {MdImageNotSupported} from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai';
import { SideBar } from '../../../App';


function addHistory(historyList){
        localStorage.setItem('history',JSON.stringify(historyList));
}

function addSuggestedVideo(suggestedVideo){
    localStorage.setItem('suggested',suggestedVideo);
}

const Card = ({item}) => {
    const {historyList,setHistoryList,setSuggestedVideo,suggestedVideo} = React.useContext(SideBar);
    

  return (
    <Link to={`/player/${item.videoId}`}
            onClick={()=>{
                setHistoryList([...historyList,{
                videoId : item.videoId?item.videoId:'',
                url : item.thumbnail[0]?.url?item.thumbnail[0]?.url:'',
                channelId:item.channelId?item.channelId:'',
                title: item.title?item.title:'',
                viewCount: item.viewCount?item.viewCount:0,
                publishedTimeText:item.publishedTimeText?item.publishedTimeText:'',
                lengthText: item.lengthText?item.lengthText:'',
            }]);
            setSuggestedVideo(item.videoId)
            addHistory(historyList.reverse());
            addSuggestedVideo(suggestedVideo)}}>
        <Box
            id='card'
            m={5}
            mt={0}
            h={255}
           w={285}>
                {(item?.url || item?.thumbnail[0]?.url)?
                <Image 
                    src={item?.url || item?.thumbnail[0]?.url}
                    w={'full'}
                    maxH={190}
                    objectFit={'contain'} />:
                    <MdImageNotSupported 
                        id='iconHover'
                        style={{height:150,width:150}}/>}
                <Text fontSize={'xs'} fontWeight={900}>
                    {item?.title}</Text>
                <Flex>
                    <AiFillEye />
                    <Text
                        ml={2}
                        fontSize={'xs'}
                        color={'gray.500'}>
                        {item?.viewCount}
                    </Text>
                </Flex>
            
            <Flex
                w={'full'}
                justifyContent={'space-between'}>
                <Text fontSize={'xs'}
                       fontWeight={700} >
                        {item?.publishedTimeText}
                </Text>
                <Text fontSize={'xs'}
                      fontWeight={700}>
                        {item?.lengthText}
                </Text>
            </Flex>
        </Box>
    </Link>
  )
}

export default Card