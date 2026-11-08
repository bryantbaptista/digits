'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

/** Render a single contact card. */
const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center">
      <Image
        src={contact.image}
        width={75}
        roundedCircle
        className="me-3"
        alt={`${contact.firstName} ${contact.lastName}`}
      />
      <div>
        <Card.Title>
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="text-muted">
          {contact.address}
        </Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>
    <AddNoteForm contactId={contact.id} />
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
