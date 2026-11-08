'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  note: string;
  contactId: number;
  owner: string;
}) => {
  await addNote(data);
  swal('Success', 'Your note has been added', 'success', {
    timer: 2000,
  });
};

const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
    values: {
      note: '',
      contactId,
      owner: currentUser,
    },
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Card.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Add Timestamped Note</Form.Label>
              <textarea
                rows={2}
                {...register('note')}
                className={`form-control ${errors.note ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.note?.message}</div>
            </Form.Group>
          </Col>
        </Row>

        <input type="hidden" {...register('contactId', { valueAsNumber: true })} />
        <input type="hidden" {...register('owner')} />

        <Form.Group>
          <Row className="pt-3">
            <Col>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Col>
            <Col>
              <Button type="button" onClick={() => reset()} variant="warning">
                Reset
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Card.Body>
  );
};

export default AddNoteForm;
