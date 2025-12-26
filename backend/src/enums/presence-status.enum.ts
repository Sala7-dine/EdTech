export enum PresenceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

// Labels en français pour l'affichage
export const PresenceStatusLabels: Record<PresenceStatus, string> = {
  [PresenceStatus.PRESENT]: 'Présent',
  [PresenceStatus.ABSENT]: 'Absent',
  [PresenceStatus.LATE]: 'Retard',
  [PresenceStatus.EXCUSED]: 'Excusé',
};

// Couleurs pour l'affichage frontend
export const PresenceStatusColors: Record<PresenceStatus, string> = {
  [PresenceStatus.PRESENT]: 'success', // Vert
  [PresenceStatus.ABSENT]: 'danger',   // Rouge
  [PresenceStatus.LATE]: 'warning',    // Orange
  [PresenceStatus.EXCUSED]: 'info',    // Bleu
};

// Icônes suggérées
export const PresenceStatusIcons: Record<PresenceStatus, string> = {
  [PresenceStatus.PRESENT]: 'check-circle',
  [PresenceStatus.ABSENT]: 'x-circle',
  [PresenceStatus.LATE]: 'clock',
  [PresenceStatus.EXCUSED]: 'info-circle',
};

// Fonction pour valider un statut
export function isValidPresenceStatus(status: string): status is PresenceStatus {
  return Object.values(PresenceStatus).includes(status as PresenceStatus);
}

// Liste de tous les statuts disponibles
export const ALL_PRESENCE_STATUSES = Object.values(PresenceStatus);