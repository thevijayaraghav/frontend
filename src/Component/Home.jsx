import { Link } from 'react-router-dom';
import '../../src/App.css'; 
function Home() {
    return (
        <div className="home-container">
            <h2>Welcome home!</h2>
            <p>Enjoy your stay!</p>
            <Link to="/register" className="register-link">Register now!</Link>
        </div>
    );
}

export default Home;
