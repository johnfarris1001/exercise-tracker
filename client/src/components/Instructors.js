import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Card, Header, Button, Divider } from "semantic-ui-react";
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
