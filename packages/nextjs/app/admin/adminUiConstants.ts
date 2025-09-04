// Shared styling constants for admin-related pages
// Centralizing these avoids repetition and keeps visual consistency.
// baseCardClass no longer needed here since sections use <Card> directly
export const ADMIN_SECTION_HEADER = "text-xs font-medium uppercase tracking-wide opacity-70"; // aligned with portfolio
export const ADMIN_ROW = "flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-6 text-sm";
export const ADMIN_LABEL = "flex-1 text-left opacity-70";
export const ADMIN_BUTTON = "btn btn-secondary btn-xs";

// Helper object if consumers prefer destructuring
export const adminUi = {
  header: ADMIN_SECTION_HEADER,
  row: ADMIN_ROW,
  label: ADMIN_LABEL,
  button: ADMIN_BUTTON,
};
