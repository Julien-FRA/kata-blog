import React from "react";
import Card from "react-bootstrap/Card";

export const CardComment = () => {
  return (
    <div>
      <Card>
        <Card.Header>Author</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
};
