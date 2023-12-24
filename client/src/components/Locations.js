import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Card, Header, Button, Divider } from "semantic-ui-react";
import { LocationsContext } from "../contexts/LocationsContext";

function Locations() {
    const { locations } = useContext(LocationsContext);
    const navigate = useNavigate();

    function handleClick() {
        navigate("/locations/new");
    }

    const locationsToDisplay = locations[0]
        ? locations.map((item) => {
              return (
                  <Card key={item.id}>
                      <Card.Content>
                          <Card.Header>{item.name}</Card.Header>
                          <Card.Meta>{item.address}</Card.Meta>
                          <Card.Description>
                              {item.description}
                          </Card.Description>
                      </Card.Content>
                  </Card>
              );
          })
        : null;

    return (
        <div style={!locations[0] ? { display: "none" } : { padding: "10px" }}>
            <Header as="h1">Locations</Header>
            <Card.Group centered>{locationsToDisplay}</Card.Group>
            <Divider />
            <Outlet />
            <Button onClick={handleClick}>Add New Location</Button>
        </div>
    );
}

export default Locations;
