import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { BsFillFileImageFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'
import Card from '../Card/Card';
import { options,SideBar } from '../../../App';


const URL='https://youtube-v3-alternative.p.rapidapi.com/channel?id='
const ChannelDetails = () => {
    const {setData,setIsLoading,data} = useContext(SideBar);
    const [meta,setMeta] = React.useState(()=>{});
    const {channelId} = useParams();


    React.useEffect(()=>{
        let isMounted = true;
        if(isMounted)
        {async function fetchChannelDetails(channelId){
            setIsLoading(true);
            const response = await fetch(URL+channelId,options)
            const {meta,data} = await response.json();
            setMeta(meta);
            setData(data)
            
            console.log(data);
            console.log(meta);
        }
    
        fetchChannelDetails(channelId);    
    }

        return ()=>{isMounted=false}

    },[channelId])


  return (<>
    <Box pr={5} pl={5} w={'full'} pos={'relative'} >
        <Flex w={'full'} gap={4}>
        <Box 
        pos={'absolute'}
        zIndex={-1}
        >
            <Image src={meta?.image?.banner[1]?.url} w={'100vw'} />
        </Box>
        <Image 
        borderRadius={'50%'}
        src={meta?.thumbnail[0]?.url || <BsFillFileImageFill color={'red'}/>}
         height={150} width={150} />
        <Text fontSize={'xxx-large'} fontWeight={900}>{meta?.title}</Text>
        </Flex>
        <Flex justifyContent={'flex-end'} gap={5} >
        <Text fontWeight={900} mt={8} mb={10}>Subscribers:</Text>
        <Text fontWeight={900} fontSize={'lg'} mt={8} bg={'red'} pl={5} pr={5}
        borderRadius={10} mb={10}>{meta?.subscriberCount}</Text>
        </Flex>
        <Flex w={'full'} flexWrap={'wrap'}>
        {meta?.keywords?.map((item,i)=><Text 
                    borderRadius={15}
                    mr={8}
                    mb={5}
                    pl={6}
                    pr={6}
                    key={i}
                    fontWeight={700} 
                    bg={'red.800'}>
                            {item}
                        </Text>)}
        </Flex>
        <Text fontSize={'lg'} mb={10}>{meta?.description}</Text>
        <Text fontWeight={900}
         fontSize={'xxx-large'}
         mb={10}>Playlists:</Text>
        <Flex w={'full'} flexWrap={'wrap'} 
            justifyContent={'center'}
            columnGap={8}>{data?.map((item,i)=>{
            return (
                        <Card item={item} />
                    )
        })}
        </Flex>
    </Box>
    </>
  )
}

export default ChannelDetails