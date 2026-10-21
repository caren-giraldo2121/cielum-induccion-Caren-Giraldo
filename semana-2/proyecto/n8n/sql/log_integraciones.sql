-- ============================================================
--  Tabla de bitácora de integraciones (parte 7 - n8n)
--  Cada ejecución del flujo pedido-a-zoho deja aquí una fila,
--  tanto si salió bien como si falló.
--
--  Ya está incluida en database.sql (se crea sola en una base NUEVA).
--  Si tu volumen pgdata ya existía, ejecútala a mano (ver README-parte-7.md).
-- ============================================================

CREATE TABLE IF NOT EXISTS log_integraciones (
    id_log        SERIAL PRIMARY KEY,
    fecha         TIMESTAMP    NOT NULL DEFAULT NOW(),
    flujo         VARCHAR(100) NOT NULL,             -- p. ej. 'pedido-a-zoho'
    id_pedido     INTEGER,                           -- sin FK: el log se conserva aunque borren el pedido
    email_cliente VARCHAR(150),
    accion        VARCHAR(30)  NOT NULL,             -- creado | actualizado | rechazado | error
    estado        VARCHAR(20)  NOT NULL,             -- exito | error
    id_zoho       VARCHAR(50),                       -- id del Contact en Zoho
    mensaje       TEXT,
    payload       JSONB                              -- lo que llegó al webhook
);

CREATE INDEX IF NOT EXISTS idx_log_integraciones_pedido ON log_integraciones (id_pedido);
CREATE INDEX IF NOT EXISTS idx_log_integraciones_fecha  ON log_integraciones (fecha);
