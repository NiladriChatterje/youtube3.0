import { Flex } from '@chakra-ui/react'
import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Reactplayer from '../ReactPlayer/ReactPlayer';
import ChannelDetails from './ChannelDetails/ChannelDetails';
import History from './History/History';
import Home from './Home/Home';
import Trending from './Trending/Trending';

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
          <Route path={'/Trending'} element={<Trending />} />
          <Route path={'/:category'} element={<Home />} />
          <Route path={'/player/:id'} element={<Reactplayer />} />
          <Route path={'/ChannelDetails/:channelId'} element={<ChannelDetails />} />     
        </Routes>
    </Flex>
  )
}
