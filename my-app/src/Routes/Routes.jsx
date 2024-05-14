import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import FeedbackTable from '../Table/FeedbackTable'
import FormScreen from '../Forms/Screenone'

const Routes_Generc = () => {
  return <Routes>
    <Route path='/' element={<FormScreen/>}/>
    <Route path='/receivedfeedback' element={<FeedbackTable/>}/>

  </Routes>
}

export default Routes_Generc