// MagicRecipeForm.js
import { Form, Button } from 'react-bootstrap';

const MagicRecipeForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
      </Form.Group>
      <Button variant="outline-info" type="submit">Submit</Button>
    </Form>
  );
};

export default MagicRecipeForm;
