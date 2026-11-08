'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

/** Render a single contact card. */
const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
  <Card className="h-100 d-flex flex-column" style={{ maxWidth: '390px', minHeight: '640px' }}>
    <Card.Header className="bg-light">
      <Image
        src={contact.image}
        width={72}
        height={72}
        alt={`${contact.firstName} ${contact.lastName}`}
        style={{ objectFit: 'cover' }}
      />
      <Card.Title className="fs-5 mb-1">
        {contact.firstName} {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="fs-6">
        {contact.address}
      </Card.Subtitle>
    </Card.Header>

    <Card.Body style={{ flex: '0 0 auto' }}>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>

    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>

    <AddNoteForm contactId={contact.id} />

    <Card.Footer className="mt-auto">
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
