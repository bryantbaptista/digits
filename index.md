<img src="doc/landing.png">

# Digits Contact Manager

Digits is a contact management application built with Next.js, React Bootstrap, Prisma, and PostgreSQL.

Users can create an account, sign in to their account, add contacts, view their added contacts, edit contact information, and add timestamped notes.

## Installation

1. Install Node.js and PostgreSQL.
2. Clone the Digits repository from GitHub.
3. Open the project folder in VSCode.
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Create a PostgreSQL database named `digits`.

6. Create a `.env` file containing your PostgreSQL connection string and authentication secret:

   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/digits?schema=public"
   AUTH_SECRET="YOUR_AUTH_SECRET"
   ```

   Replace the placeholder values with your own credentials. Do not commit the `.env` file.

7. Apply the database migrations and generate the Prisma client:

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

8. Seed the database:

   ```bash
   npm run seed
   ```

9. Start the application:

   ```bash
   npm run dev
   ```

10. Open http://localhost:3000 in your browser.

## Application Walkthrough

### Landing Page

The landing page introduces Digits and provides access to the authentication features.

Users can sign in or register for a new account.

<img src="doc/landing.png">

### Sign In and Sign Up

Users can sign in using an existing account or register for a new one.

The application includes the following development accounts:

- Email: `john@foo.com`
- Email: `admin@foo.com`

Both accounts use the development password `changeme`.

### Add Contact

After signing in, users can click **Add Contact** to create a new contact.

The form includes fields for:

- First name
- Last name
- Address
- Image URL
- Description

<img src="doc/add-contact.png">

### List Contacts

The List Contacts page displays contacts belonging to the signed-in user.

Each contact includes a name, address, image, and description.

Users can edit contact information and add timestamped notes.

<img src="doc/contacts.png">

### Edit Contact

Users can click **Edit** on a contact to update its information.

Changes are saved to the PostgreSQL database using Prisma.

### Timestamped Notes

Each contact includes an **Add Timestamped Note** form.

Users can write and save notes associated with their contacts.

Each note records the date and time it was created.

### Change Password

Signed-in users can change their password using the account dropdown menu.

## Technologies Used

- Next.js 16
- React
- TypeScript
- React Bootstrap
- PostgreSQL
- Prisma ORM
- NextAuth.js
- React Hook Form
- Yup validation

## Quality Assurance

Run ESLint to check the code:

```bash
npm run lint
```

Build the application:

```bash
npm run build
```

## Project Structure

- `src/app/` — Application pages and routes
- `src/components/` — React components
- `src/lib/` — Database actions and utilities
- `prisma/` — Database schema and migrations
- `config/` — Development configuration
- `doc/` — Application screenshots
