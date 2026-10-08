# SmartLogix — Frontend

Aplicacion web para la gestion de inventario con autenticacion por roles.
Desarrollada con React y Vite, consume una API REST en el backend.

Proyecto grupal — Aravena, Corral, Manriquez.

---

## Tecnologias

- React 19
- React Router DOM 7
- Axios
- Vite 8

---

## Estructura del proyecto

```
src/
  componentes/
    Inventario/     # CRUD de productos con control por rol
    Navbar/         # Barra de navegacion con datos del usuario activo
  pages/
    Login/          # Autenticacion con token JWT
    Registro/       # Creacion de nueva cuenta
    Dashboard/      # Vista principal que integra Navbar e Inventario
  App.jsx           # Rutas protegidas segun sesion activa
  main.jsx
```

---

## Instalacion

```bash
git clone https://github.com/anaqueso/smartlogix_frontend_aravena_corral_manriquez.git

cd smartlogix_frontend_aravena_corral_manriquez

npm install

npm run dev
```

> Requiere que el backend este corriendo en `http://localhost:8080`

---

## Roles de usuario

| Rol | Permisos |
|---|---|
| `ADMIN` | Ver, crear, editar y eliminar productos |
| `VENDEDOR` | Ver, crear y editar productos |
| Otros | Solo visualizacion del inventario |

---

## Ramas de trabajo

| Rama | Integrante | Contenido |
|---|---|---|
| `feature/login-anais` | Anais | Login, Registro |
| `feature/inventario-fer` | Fernanda | Inventario, Navbar |
| `feature/dashboard-catrina` | Catrina | Dashboard, configuracion base |

---

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |

---

## Integrantes

- Aravena
- Corral
- Manriquez
