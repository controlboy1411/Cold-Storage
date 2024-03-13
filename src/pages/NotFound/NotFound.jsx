import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../config/routes.config";
import "./NotFound.scss";

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <Button variant="secondary" onClick={() => navigate(ROUTE_PATH.DASHBOARD)}>Back to Home</Button>
        </div>
    )
}

export default NotFound;