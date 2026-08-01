export type Lang = "en" | "es";

export interface Dict {
  // nav
  dashboard: string;
  login: string;
  register: string;
  logout: string;
  loggingOut: string;
  // auth form
  auth: {
    login: { title: string; action: string; switchText: string; switchLabel: string };
    register: { title: string; action: string; switchText: string; switchLabel: string };
    subtitle: string;
    name: string;
    email: string;
    password: string;
    namePh: string;
    emailPh: string;
    passwordPh: string;
    processing: string;
    errGeneric: string;
    errConn: string;
  };
  // landing
  badge: string;
  h1pre: string;
  h1accent: string;
  h1suf: string;
  lead: string;
  tryDemo: string;
  features: { title: string; desc: string }[];
  footer: string;
  // dashboard
  hello: string; // "Hi, {name} 👋"
  authed: string;
  role: string;
  memberSince: string;
  totalUsers: string;
  adminOnly: string;
  yourProfile: string;
  userId: string;
  registeredUsers: string;
  adminPanel: string;
  thRegistered: string;
  locale: string;
}

export const T: Record<Lang, Dict> = {
  en: {
    dashboard: "Dashboard",
    login: "Log in",
    register: "Create account",
    logout: "Log out",
    loggingOut: "Logging out…",
    auth: {
      login: { title: "Log in", action: "Sign in", switchText: "Don't have an account?", switchLabel: "Create one" },
      register: { title: "Create account", action: "Sign up", switchText: "Already have an account?", switchLabel: "Log in" },
      subtitle: "Authentication demo with JWT and httpOnly cookies.",
      name: "Name",
      email: "Email",
      password: "Password",
      namePh: "Ada Lovelace",
      emailPh: "you@email.com",
      passwordPh: "At least 8 characters",
      processing: "Processing…",
      errGeneric: "Something went wrong. Try again.",
      errConn: "Couldn't reach the server.",
    },
    badge: "Portfolio project · Full-stack",
    h1pre: "Secure authentication with ",
    h1accent: "JWT",
    h1suf: " in Next.js",
    lead: "Register, log in and a role-based protected dashboard. Backend and frontend in a single app, production-ready.",
    tryDemo: "Try the demo",
    features: [
      { title: "JWT + httpOnly cookies", desc: "Signed access and refresh tokens, stored in cookies invisible to JavaScript to mitigate XSS." },
      { title: "bcrypt passwords", desc: "The password is never stored in plaintext: only an irreversible salted hash." },
      { title: "Role-based authorization", desc: "Protected routes for USER and ADMIN. Admins see the full list of users." },
      { title: "Full-stack in Next.js", desc: "Frontend and backend (route handlers) in one project, deployable on Vercel + Neon." },
    ],
    footer: "Built with Next.js · Prisma · PostgreSQL —",
    hello: "Hi, {name} 👋",
    authed: "You're authenticated. This route is protected by your JWT.",
    role: "Role",
    memberSince: "Member since",
    totalUsers: "Total users",
    adminOnly: "Only visible to ADMIN",
    yourProfile: "Your profile",
    userId: "User ID",
    registeredUsers: "Registered users",
    adminPanel: "Admin-only panel.",
    thRegistered: "Registered",
    locale: "en-US",
  },
  es: {
    dashboard: "Dashboard",
    login: "Iniciar sesión",
    register: "Crear cuenta",
    logout: "Salir",
    loggingOut: "Saliendo…",
    auth: {
      login: { title: "Iniciar sesión", action: "Entrar", switchText: "¿No tienes cuenta?", switchLabel: "Crear una" },
      register: { title: "Crear cuenta", action: "Registrarme", switchText: "¿Ya tienes cuenta?", switchLabel: "Inicia sesión" },
      subtitle: "Demo de autenticación con JWT y cookies httpOnly.",
      name: "Nombre",
      email: "Correo",
      password: "Contraseña",
      namePh: "Ada Lovelace",
      emailPh: "tu@correo.com",
      passwordPh: "Mínimo 8 caracteres",
      processing: "Procesando…",
      errGeneric: "Algo salió mal. Inténtalo de nuevo.",
      errConn: "No se pudo conectar con el servidor.",
    },
    badge: "Proyecto de portafolio · Full-stack",
    h1pre: "Autenticación segura con ",
    h1accent: "JWT",
    h1suf: " en Next.js",
    lead: "Registro, inicio de sesión y un dashboard protegido por roles. Backend y frontend en una sola app, lista para producción.",
    tryDemo: "Probar la demo",
    features: [
      { title: "JWT + cookies httpOnly", desc: "Access y refresh tokens firmados, guardados en cookies invisibles a JavaScript para mitigar XSS." },
      { title: "Contraseñas con bcrypt", desc: "Nunca se almacena la contraseña en texto plano: solo un hash irreversible con salt." },
      { title: "Autorización por roles", desc: "Rutas protegidas para USER y ADMIN. Los admins ven la lista completa de usuarios." },
      { title: "Full-stack en Next.js", desc: "Frontend y backend (route handlers) en un solo proyecto, desplegable en Vercel + Neon." },
    ],
    footer: "Construido con Next.js · Prisma · PostgreSQL —",
    hello: "Hola, {name} 👋",
    authed: "Estás autenticado. Esta ruta está protegida por tu token JWT.",
    role: "Rol",
    memberSince: "Miembro desde",
    totalUsers: "Usuarios totales",
    adminOnly: "Solo visible para ADMIN",
    yourProfile: "Tu perfil",
    userId: "ID de usuario",
    registeredUsers: "Usuarios registrados",
    adminPanel: "Panel exclusivo para administradores.",
    thRegistered: "Registro",
    locale: "es-CO",
  },
};
