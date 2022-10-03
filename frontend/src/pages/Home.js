import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import Footer from '../components/Footer'
import Button from '@mui/material/Button'

const Home = () => {
  const { user } = useAuthContext()

  return (
    <div className="home-container">
      
      {/*  Display the footer only when the user is not looged in  */}
      { !user && <Footer /> }
    </div>
    
  )
}

export default Home