import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import useStore from "../stores/store";

function HomeCard({image, type, text}) {
    const {user} = useStore();
    const navigate = useNavigate();

    const handleClick = () => {
        if (user) {
            navigate(`/${type}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <Card className="px-2" style={{ width: '25rem' }}>
            <Card.Img variant="top" src={image}/>
            <Card.Body>
                <Card.Title>{type}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button className="offset-lg-2 col-lg-8 col-12" variant="primary" onClick={handleClick}>{type}</Button>
            </Card.Body>
        </Card>
    );
}

export default HomeCard;