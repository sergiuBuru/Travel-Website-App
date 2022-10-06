import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

// Boostrap components
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar, Button} from 'react-bootstrap';


const MyNav = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { logout } = useLogout()
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar  bg="light">
      <Container>
        <Navbar.Brand >Travel Media</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user && <Nav.Link href="/vacations">Vacations</Nav.Link>}
        </Nav>
          {user && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>{user.email}</Navbar.Text>
              <Button 
                className="logout-btn"
                variant="outline-dark"
                size="sm"
                onClick={handleLogout}>Logout</Button>
          </Navbar.Collapse>
          )}
      </Container>
    </Navbar>
  )
}

export default MyNav