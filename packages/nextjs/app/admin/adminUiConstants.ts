// Shared styling constants for admin-related pages
// Centralizing these avoids repetition and keeps visual consistency.

export const ADMIN_SECTION = "flex flex-col mx-auto bg-base-100 w-full rounded-md px-4 pb-4";
export const ADMIN_SECTION_HEADER = "text-xl text-content/70"; // bright for dark mode
export const ADMIN_ROW = "flex justify-between items-center px-4 flex-col sm:flex-row gap-12";
export const ADMIN_LABEL = "flex-1 text-left text opacity-70";
export const ADMIN_BUTTON = "btn btn-secondary btn-sm";

// Helper object if consumers prefer destructuring
export const adminUi = {
  section: ADMIN_SECTION,
  header: ADMIN_SECTION_HEADER,
  row: ADMIN_ROW,
  label: ADMIN_LABEL,
  button: ADMIN_BUTTON,
};
