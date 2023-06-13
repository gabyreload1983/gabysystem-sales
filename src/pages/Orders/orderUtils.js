export const getOrderState = (state) => {
  if (state === 21) return "PENDIENTE";
  if (state === 22) return "EN PROCESO";
  if (state === 23) return "TERMINADA";
};

export const getOrderDiagnosis = (diagnosis) => {
  if (diagnosis === 21) return "PENDIENTE";
  if (diagnosis === 22) return "REPARADO";
  if (diagnosis === 23) return "SIN REPARACION";
};

export const getOrderUbication = (ubication) => {
  if (ubication === 21) return "SIN ENTREGAR";
  if (ubication === 22) return "ENTREGADO";
};

export const getOrderTier = (tier) => {
  if (tier === 0) return "NORMAL";
  if (tier === 1) return "";
  if (tier === 2) return "";
  if (tier === 3) return "ARMADOS";
  if (tier === 4) return "TURNOS/PRIORIDADES";
  if (tier === 5) return "GARANTIA REPARACION";
  if (tier === 6) return "";
  if (tier === 7) return "GARANTIA COMPRA";
  if (tier === 8) return "BOXES";
  if (tier === 9) return "ABONADOS";
  if (tier === 10) return "";
};

export const getOrderTierBackground = (tier) => {
  if (tier === 0) return "";
  if (tier === 1) return "";
  if (tier === 2) return "";
  if (tier === 3) return "table-secondary";
  if (tier === 4) return "table-primary";
  if (tier === 5) return "table-success";
  if (tier === 6) return "";
  if (tier === 7) return "table-info";
  if (tier === 8) return "table-warning";
  if (tier === 9) return "table-danger";
  if (tier === 10) return "";
};

export const isTurno = (falla) => falla.toLowerCase().includes("turno");
