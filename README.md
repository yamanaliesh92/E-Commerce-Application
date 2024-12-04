E-commerce App

## Getting Started

First, setup the development environment

```
docker compose up apidb
```

First, run the development server:

```bash
npm run dev
```

App will be listening on http://localhost:3000

## Main Features

- Supports i18n with both RTL and LTR languages supported (with layout adjustment)
- Supports dark and light themes
- Fully integrated payment system
- Enables users to create/update/delete products
- Enables users to add product to carts and proceed to payments

## Main Components/Libraries

### Next SSR and CSR

The HTML is rendered when possible on the server offering seamless user experience

### Prisma DB

Used for storing and retrieving data, offering better developer experience and code-gen capabilities

### Stripe

Used as payment processor covering multiple payment providers

### Redux

Used for state management

### Next Intel

For Internationalization and multiple languages support

### Tailwind With Tailwind RTL Plugin

Utilize tailwind for building uis, with the rtl plugin, we are able to switch between RTL and LTR languages easily

### React Hook Forms + ZOD

Used react hook forms for handling users input with zod in order to validate users inputs

### Authentication

Currently we are using jsonwebtoken library in order to sign and verify tokens
