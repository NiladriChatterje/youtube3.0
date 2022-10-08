import { Flex } from '@chakra-ui/react';
import React from 'react';
import SkeletonLoader from '../SkeletonLoader';
import { SideBar } from '../../../App';
const Card = React.lazy(()=>import('../Card/Card'));



const History = () => {
    const {historyList} = React.useContext(SideBar);
 
  
  return (
    <Flex 
    flexWrap={'wrap'}
      w='full' 
      h ='max-content'>
        {historyList.length?historyList.map((item,i)=>{
          return <React.Suspense key={i}
            fallback={<SkeletonLoader />}>
            <Card key={i} item={item} />
          </React.Suspense>})
          :''}
    </Flex>
  );
}

export default History;