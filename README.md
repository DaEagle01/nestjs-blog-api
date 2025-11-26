# NestJS Blog API

A robust RESTful API built with [NestJS](https://nestjs.com/) for managing blog posts, users, and authentication. This project demonstrates modern backend development practices with TypeScript, including comprehensive API documentation, validation, and code documentation using Compodoc.

## 🚀 Features

- **User Management** - Complete user CRUD operations with validation
- **Post Management** - Create, read, update, and delete blog posts
- **Authentication Module** - Authentication service with circular dependency handling
- **API Documentation** - Interactive Swagger/OpenAPI documentation
- **Code Documentation** - Automated code documentation with Compodoc
- **Input Validation** - Request validation using class-validator and class-transformer
- **Type Safety** - Full TypeScript support throughout the application
- **Testing** - Unit and E2E testing setup with Jest

## 📋 Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nestjs-intro
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables (if needed):

```bash
cp .env.example .env
```

## 🏃 Running the Application

### Development Mode

Start the application with hot-reload:

```bash
yarn start:dev
```

The API will be available at `http://localhost:3000`

### Production Mode

Build and run the production version:

```bash
yarn build
yarn start:prod
```

### Debug Mode

Run with debugging enabled:

```bash
yarn start:debug
```

## 📚 API Documentation

The application includes Swagger documentation for easy API exploration and testing.

### Access Swagger UI

Once the application is running, navigate to:

```
http://localhost:3000/api
```

### Generate Code Documentation

Generate comprehensive code documentation with Compodoc:

```bash
# Generate documentation once
yarn doc

# Serve documentation at http://localhost:3001
yarn doc:serve

# Watch mode - auto-regenerate on code changes
yarn doc:watch
```

Documentation will be available at `http://localhost:3001` with coverage reports, dependency graphs, and detailed code documentation.

## 🧪 Testing

### Unit Tests

Run unit tests:

```bash
yarn test
```

### E2E Tests

Run end-to-end tests:

```bash
yarn test:e2e
```

### Test Coverage

Generate test coverage report:

```bash
yarn test:cov
```

### Watch Mode

Run tests in watch mode during development:

```bash
yarn test:watch
```

## 📁 Project Structure

```
nestjs-intro/
├── src/
│   ├── auth/                 # Authentication module
│   ├── posts/                # Posts module
│   │   ├── dtos/            # Data Transfer Objects
│   │   ├── enums/           # Post-related enumerations
│   │   ├── providers/       # Services and business logic
│   │   └── posts.controller.ts
│   ├── users/                # Users module
│   │   ├── dtos/            # Data Transfer Objects
│   │   ├── providers/       # Services and business logic
│   │   └── users.controller.ts
│   ├── app.module.ts         # Root application module
│   └── main.ts              # Application entry point
├── test/                     # E2E tests
├── documentation/            # Generated Compodoc documentation
├── dist/                     # Compiled production code
└── package.json
```

## 🔧 Available Scripts

| Script             | Description                                   |
| ------------------ | --------------------------------------------- |
| `yarn start`       | Start the application                         |
| `yarn start:dev`   | Start in development mode with hot-reload     |
| `yarn start:debug` | Start in debug mode                           |
| `yarn start:prod`  | Start production build                        |
| `yarn build`       | Build the application for production          |
| `yarn format`      | Format code with Prettier                     |
| `yarn lint`        | Lint and fix code with ESLint                 |
| `yarn test`        | Run unit tests                                |
| `yarn test:watch`  | Run tests in watch mode                       |
| `yarn test:cov`    | Generate test coverage report                 |
| `yarn test:e2e`    | Run end-to-end tests                          |
| `yarn doc`         | Generate code documentation                   |
| `yarn doc:serve`   | Serve generated documentation                 |
| `yarn doc:watch`   | Watch and regenerate documentation on changes |

## 🏗️ Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Code Documentation**: Compodoc
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

## 📝 API Endpoints

### Users

- `GET /users` - Get all users (with pagination)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user (coming soon)
- `PATCH /users/:id` - Update user (coming soon)
- `DELETE /users/:id` - Delete user (coming soon)

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update post (coming soon)
- `DELETE /posts/:id` - Delete post (coming soon)

For detailed API specifications and request/response examples, visit the Swagger documentation at `/api`.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
# Add other environment variables as needed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license.

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Documentation powered by [Compodoc](https://compodoc.app/)
- API documentation with [Swagger](https://swagger.io/)

## 📞 Support

For questions and support:

- Visit [NestJS Documentation](https://docs.nestjs.com)
- Join the [NestJS Discord](https://discord.gg/G7Qnnhy)
- Check out [NestJS Courses](https://courses.nestjs.com/)

---

**Note**: This is a learning/introductory project. For production deployments, ensure proper security measures, database integration, and environment configuration are in place.
