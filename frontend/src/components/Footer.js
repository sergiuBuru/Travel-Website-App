// import { Container, Row, Col } from 'react-bootstrap';
import { Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()

  // navigate to the log in route
  const logIn = () => {

    navigate('/login')
    console.log("go to login")
  }

  const signUp = () => {

    navigate('/signup')
    console.log("go to signup")
  }

  return (
    <Grid columnSpacing={5} className='footer' container justifyContent="center" alignItems="center" display="flex">
      <Grid item>
        <Button size="large"variant="contained" onClick={logIn}>Log in</Button>
      </Grid>
      <Grid item>
        OR
      </Grid>
      <Grid item>
        <Button size="large" variant="contained" onClick={signUp}>Sign up</Button>
      </Grid>     
    </Grid>
  )
}

export default Footer