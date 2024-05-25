# AusBizGrowth

This is a Next.js project that provides a platform for organizations seeking to engage with high growth potential SMEs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, make sure you have the following installed and set up:

- Node.js
- npm
- MongoDB: The application uses MongoDB as its primary database. Ensure you have MongoDB installed and running on your local machine or have an active MongoDB Atlas account.
- Email: You'll need an active email account for sending OTP for email verification.

### Installing

1. Install the dependencies:

```sh
npm install
```

2. Set up your environment variables:

Copy the `.env.example` file to a new file named `.env` and fill out the environment variables according to your MongoDB and email settings. The application uses these environment variables for various configurations.

3. Start the development server:

```sh
npm run dev
```

Please note that the development server will not start if the environment variables in the `.env` file are not correctly set up.

## Features

- Secure authentication with OTP email verification.
- Responsive dashboard layout.
- High-quality UI components.
- A well-structured application layout in the `app` directory.
- Fully features admin panel for administrators.

## Deployment

To build the project for production, use the following command:

```sh
npm run build
```

## Built With

- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Next.js](https://nextjs.org/) - Web framework
- [PayloadCMS](https://payloadcms.com/) - Content management system
- [Shadcn/ui](https://ui.shadcn.com/) - UI component library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
