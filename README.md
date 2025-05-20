# 🌟 Employee Benefits Portal 🌟

A modern, user-friendly application for managing employee benefits and dependents. Built with React 19, TanStack Router, and Tailwind CSS.

## 🚀 Purpose

This application helps HR departments and employees manage benefits enrollment, dependent information, and cost calculations. It provides a streamlined interface for:

- 👨‍👩‍👧‍👦 Managing employee dependents
- 💰 Calculating benefit costs
- 📊 Visualizing benefit information
- 🔄 Real-time updates to benefit selections

## 🏗️ Project Structure

```
employee-benefits/
├── public/                # Static assets
├── src/
│   ├── common/            # Shared components, hooks, and utilities
│   │   ├── components/    # Reusable UI components
│   │   ├── ErrorBoundaries/ # Error handling components
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript type definitions
│   ├── features/          # Feature-based organization
│   │   ├── dashboard/     # Dashboard feature
│   │   │   ├── components/  # Dashboard-specific components
│   │   │   ├── dashboard.query.ts  # Data fetching logic
│   │   │   ├── dashboard.utils.ts  # Utility functions
│   │   │   └── DashboardView.tsx   # Main view component
│   ├── integrations/      # Third-party integrations
│   │   └── tanstack-query/  # TanStack Query setup
│   ├── lib/               # Utility libraries
│   ├── routes/            # File-based routing
│   │   ├── __root.tsx     # Root layout
│   │   └── _app/          # Application routes
│   ├── shadcn/            # Shadcn UI components
│   │   └── ui/            # UI components
│   ├── main.tsx           # Application entry point
│   └── styles.css         # Global styles
├── .vscode/               # VS Code configuration
├── components.json        # Shadcn configuration
└── package.json           # Dependencies and scripts
```

## 🧩 Feature and File-Based Organization

This project uses a hybrid approach to code organization:

### 🗂️ Feature-Based Organization

- **Features folder**: Contains domain-specific code organized by feature
- Each feature has its own components, queries, and utilities
- Promotes cohesion and makes it easier to understand business domains

### 📁 File-Based Routing

- **Routes folder**: Uses TanStack Router's file-based routing
- Route files automatically generate the application's routing structure
- Simplifies navigation management and code splitting

## 🛠️ Technologies & Libraries

### Core Technologies

- ⚛️ **React 19**: Latest version with improved performance
- 🧭 **TanStack Router**: File-based routing with type safety
- 🎨 **Tailwind CSS**: Utility-first CSS framework
- 📊 **TanStack Query**: Data fetching and state management
- 🔍 **TypeScript**: Type safety throughout the application

### UI Components

- 🎭 **Shadcn UI**: High-quality, accessible UI components
- 🔄 **Radix UI**: Headless UI primitives
- 🌙 **next-themes**: Dark/light mode support
- 🔔 **Sonner**: Toast notifications

### Development Tools

- 🧪 **Vitest**: Fast unit testing
- 🧹 **Prettier**: Code quality and formatting
- 🔄 **Concurrently**: Run multiple scripts simultaneously
- 🧠 **JSON Server**: Mock API for development

## 🧠 Advanced React Patterns

### 🧩 Compound Components

Used in our UI components to provide a more declarative API:

```tsx
<FlexTable>
	<FlexTableHeader>
		<FlexTableHeaderCell>Name</FlexTableHeaderCell>
		<FlexTableHeaderCell>Dependents</FlexTableHeaderCell>
	</FlexTableHeader>
	<FlexTableBody>
		<FlexTableRow>
			<FlexTableCell>John Doe</FlexTableCell>
			<FlexTableCell>2</FlexTableCell>
		</FlexTableRow>
	</FlexTableBody>
</FlexTable>
```

### 🎭 Render Props

Used for flexible component composition:

```tsx
<CircularProgress value={75} renderLabel={(value) => `${value}%`} />
```

### 🏢 Container Pattern

Separates data fetching from presentation:

```tsx
// Container component
const DashboardContainer = () => {
	const { data, isLoading } = useGetAllEmployeesWithDependentsQuery();
	return <DashboardView employeesWithDependents={data} isLoading={isLoading} />;
};

// Presentation component
const DashboardView = ({ employeesWithDependents, isLoading }) => {
	// UI rendering logic
};
```

### 🛡️ Error Boundaries

Custom error boundaries to gracefully handle runtime errors:

```tsx
<ErrorBoundary>
	<DashboardView />
</ErrorBoundary>
```

## 🧪 Unit Tests

Tests are written using Vitest and React Testing Library:

```tsx
test('renders employee list correctly', () => {
	render(<DashboardView employeesWithDependents={mockData} />);
	expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

Run tests with:

- `npm run test`: Run all tests
- `npm run test:ui`: Run tests with UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/employee-benefits.git
cd employee-benefits
```

2. Install dependencies and run the project in one command!

```bash
# Run the whole thing (installs npm packages and starts the frontend and mock API)
npm start
```

3. Open your browser and navigate to:

```
http://localhost:3000
```

The mock API will be available at:

```
http://localhost:3001
```

### Building for Production

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
