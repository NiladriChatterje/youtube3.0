import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const SkeletonLoader = () => {
  return (
    <Flex
    h={'90vh'}
    justifyContent={'center'}
    overflow={'hidden'}
        flexWrap={'wrap'}>
      {new Array(8).map((item,i) =><Box padding='6' 
                                    m={8} boxShadow='lg' 
                                    bg='blackAlpha.900'
                                    key={i}>
          <SkeletonCircle size='10' />
          <SkeletonText m='10' noOfLines={4} spacing='4' />
      </Box>)}
    </Flex>
  )
}

export default SkeletonLoader