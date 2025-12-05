# Digital Savings Simulator - Frontend

Aplicación web desarrollada con Next.js para simular productos de ahorro digital.

## Demo

🚀 **Aplicación desplegada:** https://digital-savings-simulator-container-kappa.vercel.app/products

## Tecnologías

- **Next.js** 16.x
- **React** 19.x
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **Radix UI**

## Instalación

```bash
npm install
```

## Variables de Entorno

```bash
API_URL=http://localhost:3001
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm run build && npm run start
```

## Funcionalidades

- **Catálogo de Productos** (`/products`) - 14 tipos de cuentas de ahorro
- **Onboarding** (`/onboarding`) - Registro de intención de apertura
- **Simulador** (`/simulator`) - Cálculo de rentabilidad con interés simple

## Decisiones Técnicas

### ISR en `/products`
Se implementó **Incremental Static Regeneration** con revalidación cada 24 horas (`revalidate: 60 * 60 * 24`) porque los productos bancarios tienen lanzamientos poco frecuentes, optimizando el rendimiento sin sacrificar la actualización de contenido.

## Estructura

```
app/
├── products/           # Catálogo de productos
├── onboarding/         # Formulario de registro
├── simulator/          # Simulador de rentabilidad
└── layout.tsx          # Layout principal

components/
├── ui/                 # Componentes base (Radix UI)
└── pages/              # Componentes de página
```

## Scripts

```bash
npm run build          # Compilar
npm run lint           # Linter
```