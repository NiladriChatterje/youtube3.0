import { Heading, Flex, Input, InputGroup, InputRightElement,Divider  } from '@chakra-ui/react'
import React, { useRef } from 'react'
import {AiFillYoutube,AiOutlineMenuUnfold} from 'react-icons/ai'
import {FaSearchengin} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { SideBar } from '../../App'


export default function Header(){
  const {setQuery} = React.useContext(SideBar)
 
  const {setIsToggle} = React.useContext(SideBar);
  const inputRef = useRef();
  const queryChange=(e)=>{
    setQuery(e.target.value);
  }
  const navigate = useNavigate();

  const debouncer = React.useCallback((func)=>{
      let debounceTimer
      return function() {
          const context = this
          const args = arguments
              clearTimeout(debounceTimer)
                  debounceTimer
              = setTimeout(() => func.apply(context, args), 8000)
      }
  
  })

  const optimizedChange = React.useCallback(debouncer(queryChange),[])

  return (<>
    <Flex w={'100vw'}
          pos='relative'
          h={70}
          style={{alignItems:'center'}}
          >
            <AiOutlineMenuUnfold 
                      onClick={()=>setIsToggle(p => !p)}
                      cursor={'pointer'}
                      color='white'
                     style={{height:30,width:30}} />
            <AiFillYoutube 
                    color='rgb(250,20,40)'
                    style={{height:40,width:80}} />
          <InputGroup h={30}>
            <Heading size={'lg'}>2.0</Heading>
            <Input id='searchBar'
                  ref={inputRef}
                  variant={'filled'}
                  bg={'whiteAlpha.300'}
                  onChange={optimizedChange} 
                  border='none'
                  pos={'absolute'}
                  right={10}
                  w={'45vw'}
                   />
                  <InputRightElement
                         children={<FaSearchengin
                         onClick={()=>{
                          if(inputRef.current.value !== '')
                            {setQuery(inputRef.current.value);
                              navigate("/");}
                         }}
                          cursor={'pointer'}
                          style={{right:0}}
                           />}
                      />
            
          </InputGroup>
    </Flex>
    <Divider /></>
  )
}

