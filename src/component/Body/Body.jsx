import { Flex } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineCloudSync } from 'react-icons/ai';
import {Routes,Route} from 'react-router-dom';
import Reactplayer from '../ReactPlayer/ReactPlayer';
import ChannelDetails from './ChannelDetails/ChannelDetails';
import History from './History/History';
import Home from './Home/Home';

export default () => {
  return (
    <Flex
        id='channel'
        w={'full'}
        h={'90vh'}
        overflowY={'auto'}
        flexWrap={'wrap'}
    >
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/History'} element={<History />} />
          <Route path={'/:category'} element={<Home />} />
          <Route path={'/player/:id'} element={<Reactplayer />} />
          <Route path={'/*'} element={<AiOutlineCloudSync />} />
          <Route path={'/ChannelDetails/:channelId'} element={<ChannelDetails />} />     
        </Routes>
    </Flex>
  )
}
