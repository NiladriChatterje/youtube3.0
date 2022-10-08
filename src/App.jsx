import React,{ createContext } from 'react'
import { Box,Flex } from '@chakra-ui/react'
import './App.css'
import Body from './component/Body/Body';
import Header from './component/Header/Header';
import Sidebar from './component/SideBar/Sidebar';

export const URL2 = 'https://youtube-v3-alternative.p.rapidapi.com/related?id=';
export const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e451c225d6msh565153abf287ccdp16ae41jsn98b23c7ee13a',
		'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
	}
};

export const SideBar = createContext()

function App() {
  const [query,setQuery]=React.useState(()=>'');
  const [isToggle,setIsToggle] = React.useState(()=>true)
  const [suggestedVideo,setSuggestedVideo] = React.useState(()=>(localStorage.getItem('suggested')||'dQw4w9WgXcQ'))
  const [data,setData] = React.useState(()=>[]);
  const [historyList,setHistoryList] = React.useState(()=>(JSON.parse(localStorage.getItem('history'))||[]));
  const [isLoading,setIsLoading] = React.useState(()=>true)

  return (
    
    <Box  id="App" 
          bg={'blackAlpha.900'} 
          h={'100vh'} 
          w={'100vw'}
          color={'whiteAlpha.900'}
          >
      <SideBar.Provider value={{isToggle,data,suggestedVideo,
      query,setQuery,
        historyList,isLoading,setIsLoading,setHistoryList,
        setData,setIsToggle,setSuggestedVideo}}>
      <Header />
      <Flex>
      <Sidebar />
      <Body />
      </Flex>
      </SideBar.Provider>
    </Box>
    
  )
}

export default App
