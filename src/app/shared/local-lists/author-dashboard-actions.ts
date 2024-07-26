import { faBook, faDashboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthorNavigation } from "../../core/interfaces/dashboard-author-links.interface";

export const authorDashboardActions: AuthorNavigation[] = [
  {
    name: "Kontrolna tabla",
    icon: faDashboard,
  },
  {
    name: "Moje knjige",
    icon: faBook,
  },
];
