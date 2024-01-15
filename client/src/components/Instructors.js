import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
    Card,
    Header,
    Button,
    Divider,
    List,
    Segment,
} from "semantic-ui-react";
import { InstructorsContext } from "../contexts/InstructorsContext";

function Instructors() {
    const { instructors } = useContext(InstructorsContext);
    const navigate = useNavigate();

    function handleClick() {
        navigate("/instructors/new");
    }

    const instructorsToDisplay = instructors[0]
        ? instructors.map((item) => {
              return (
                  <Card key={item.id}>
                      <Card.Content>
                          <Card.Header>{item.name}</Card.Header>
                          <Card.Meta>
                              Years of Experience: {item.years}
                          </Card.Meta>
                          <Segment.Group horizontal>
                              <Segment
                                  style={{
                                      overflow: "auto",
                                      maxHeight: "200px",
                                  }}
                              >
                                  <Card.Description
                                      style={{ textAlign: "left" }}
                                  >
                                      <Header>Students:</Header>
                                      <List>
                                          {item.unique_users.map((user) => {
                                              return (
                                                  <List.Item key={user.id}>
                                                      {user.username}
                                                  </List.Item>
                                              );
                                          })}
                                      </List>
                                  </Card.Description>
                              </Segment>
                              <Segment
                                  style={{
                                      overflow: "auto",
                                      maxHeight: "200px",
                                  }}
                              >
                                  <Card.Description
                                      style={{ textAlign: "right" }}
                                  >
                                      <Header>Locations:</Header>
                                      <List>
                                          {item.unique_locations.map((loc) => {
                                              return (
                                                  <List.Item key={loc.id}>
                                                      {loc.name}
                                                  </List.Item>
                                              );
                                          })}
                                      </List>
                                  </Card.Description>
                              </Segment>
                          </Segment.Group>
                      </Card.Content>
                  </Card>
              );
          })
        : null;

    return (
        <div
            style={!instructors[0] ? { display: "none" } : { padding: "10px" }}
        >
            <Header as="h1">Instructors</Header>
            <Card.Group centered>{instructorsToDisplay}</Card.Group>
            <Divider />
            <Outlet />
            <Button onClick={handleClick}>Add New Instructor</Button>
        </div>
    );
}

export default Instructors;
