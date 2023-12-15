import { useContext } from "react";
import { LocationsContext } from "../contexts/LocationsContext";
import { Card, Header, Button, Divider } from "semantic-ui-react";

function Locations() {
    const { locations } = useContext(LocationsContext);

    const locationsToDisplay = locations[0]
        ? locations.map((item) => {
              return (
                  <Card>
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
        <div>
            <Header as="h1">Locations</Header>
            <Card.Group centered>{locationsToDisplay}</Card.Group>
            <Divider />
            <Button>Create New Location</Button>
        </div>
    );
}

export default Locations;
