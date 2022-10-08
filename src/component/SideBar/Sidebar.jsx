import { Flex, Heading,Divider } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { SideBar } from '../../App';
import {AiFillHome,AiOutlineHistory} from 'react-icons/ai';
import {DiKrakenjs} from 'react-icons/di';
import {MdLocalMovies} from 'react-icons/md'
import {SiCodingninjas, SiYoutubegaming} from 'react-icons/si';
import {MdSportsVolleyball} from 'react-icons/md'
import {BsBookHalf} from 'react-icons/bs'
import {BiTrendingUp} from 'react-icons/bi'
import {FaSatelliteDish} from 'react-icons/fa'
import './Sidebar.css'
import { Link } from 'react-router-dom';

const sideBarData =[
  {icon:AiFillHome,name:'Home'},
  {icon:BiTrendingUp,name:'Trending'},
  {icon:AiOutlineHistory,name:'History'},
  {icon:DiKrakenjs,name:'Entertainment'},
  {icon:MdLocalMovies,name:'Movies'},
  {icon:SiYoutubegaming,name:'Gaming'},
  {icon:SiCodingninjas,name:'Coding'},
  {icon:MdSportsVolleyball,name:'Sports'},
  {icon:BsBookHalf,name:'Learning'},
  {icon:FaSatelliteDish,name:'Channel'},
]

const Sidebar = () => {
  const {isToggle,setQuery} = useContext(SideBar);
  
  return (<>
     {isToggle && <Flex
        flexDir={'column'}
        w={'13vw'}
        h={'full'}
    >
      {sideBarData?.map((item,i)=>{
                return <Link to={`/${item.name==='Home'?'':item.name}`} key={i}
                onClick={()=>setQuery('')}>
                <Flex
                id='sidebar-item'
                mb={3}
                mt={3}
                p={2}
                cursor={'pointer'}
                width={'95%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                ><item.icon color={'red'} />{!(window.innerWidth<=1200) && <Heading size={'xs'}>{item.name}</Heading>}
                </Flex></Link>
      })}
      <Divider />
    </Flex>}
    
    </>
  )
}

export default Sidebar