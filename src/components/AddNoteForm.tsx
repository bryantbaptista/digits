'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
    <Card className="mx-3 mb-3">
      <Card.Header className="text-center">
        Add Timestamped Note
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <input
              type="text"
              {...register('note')}
              className={`form-control ${errors.note ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">
              {errors.note?.message}
            </div>
          </Form.Group>

          <input type="hidden" {...register('contactId', { valueAsNumber: true })} />
          <input type="hidden" {...register('owner')} />

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
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
