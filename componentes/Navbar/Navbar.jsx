import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const API_BASE = "http://localhost:8080";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState([]);
  const [panelAbierto, setPanelAbierto] = useState(false);

  const token = user?.token || localStorage.getItem("token");
  const rol = user?.rol || localStorage.getItem("rol");
  const usuarioId = user?.id || localStorage.getItem("id");
  const username = user?.username || localStorage.getItem("username");

  const esAdmin = rol === "ADMIN";
  const esVendedor = rol === "VENDEDOR";
  const esProveedor = rol === "PROVEEDOR";
  const esUser = rol === "USER";

  const cargarNotificaciones = async () => {
    if (!token) {
      setNotificaciones([]);
      return;
    }

    try {
      const url = esAdmin
        ? `${API_BASE}/api/notificaciones`
        : `${API_BASE}/api/notificaciones/usuario/${usuarioId}`;

      if (!esAdmin && !usuarioId) {
        setNotificaciones([]);
        return;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setNotificaciones([]);
        return;
      }

      const data = await res.json();
      setNotificaciones(Array.isArray(data) ? data : []);
    } catch {
      setNotificaciones([]);
    }
  };

  const abrirPanelNotificaciones = () => {
    setPanelAbierto(!panelAbierto);
  };

  const irANotificaciones = () => {
    setPanelAbierto(false);
    navigate("/dashboard/notificaciones");
  };

  const obtenerClaseTipo = (tipo) => {
    if (tipo === "STOCK") return "mini-stock";
    if (tipo === "PEDIDO") return "mini-pedido";
    if (tipo === "ENVIO") return "mini-envio";
    return "mini-general";
  };

  useEffect(() => {
    cargarNotificaciones();

    const intervalo = setInterval(() => {
      cargarNotificaciones();
    }, 10000);

    return () => clearInterval(intervalo);
  }, [token, rol, usuarioId]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">SL</div>

        <div>
          <span className="navbar-title">SmartLogix</span>
          <span className="navbar-subtitle">Gestión logística</span>
        </div>
      </div>

      <div className="navbar-links">
        {!esProveedor && (
          <NavLink
            to="/dashboard/inventario"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            🗃️ Inventario
          </NavLink>
        )}

        {(esAdmin || esVendedor || esUser) && (
          <NavLink
            to="/dashboard/pedidos"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            📦 Pedidos
          </NavLink>
        )}

        {esAdmin && (
          <NavLink
            to="/dashboard/envios"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            🚚 Envíos
          </NavLink>
        )}

        {(esAdmin || esProveedor) && (
          <NavLink
            to="/dashboard/proveedores"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            🏭 Proveedores
          </NavLink>
        )}

        {esAdmin && (
          <NavLink
            to="/dashboard/bodegas"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            🏪 Bodegas
          </NavLink>
        )}
      </div>

      <div className="navbar-user">
        <div className="user-box">
          <span className="user-name">{username}</span>
          <span className="user-rol">{rol}</span>
        </div>

        <div className="nav-notification-wrapper">
          <button
            type="button"
            className="bell-btn"
            onClick={abrirPanelNotificaciones}
            title="Notificaciones"
          >
            🔔

            {notificaciones.length > 0 && (
              <span className="notification-badge">
                {notificaciones.length > 9 ? "9+" : notificaciones.length}
              </span>
            )}
          </button>

          {panelAbierto && (
            <div className="notification-panel">
              <div className="notification-panel-header">
                <h4>Notificaciones</h4>
                <span>{notificaciones.length}</span>
              </div>

              <div className="notification-panel-list">
                {notificaciones.length === 0 ? (
                  <p className="notification-empty">
                    No hay notificaciones nuevas.
                  </p>
                ) : (
                  notificaciones.slice(0, 4).map((n) => (
                    <button
                      key={n.id}
                      className="notification-mini-item"
                      onClick={irANotificaciones}
                    >
                      <span className={`mini-badge ${obtenerClaseTipo(n.tipo)}`}>
                        {n.tipo || "INFO"}
                      </span>

                      <p>{n.mensaje}</p>
                    </button>
                  ))
                )}
              </div>

              <button
                type="button"
                className="notification-panel-footer"
                onClick={irANotificaciones}
              >
                Ver bandeja completa
              </button>
            </div>
          )}
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}