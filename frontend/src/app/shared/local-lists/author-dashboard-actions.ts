import {
  faAdd,
  faBook
} from "@fortawesome/free-solid-svg-icons";
import { AuthorNavigation } from "../../core/interfaces/dashboard-author-links.interface";

export const authorDashboardActions: AuthorNavigation[] = [
  {
    name: "Moje knjige",
    icon: faBook,
  },
  {
    name: "Dodaj novu knjigu",
    icon: faAdd,
  },
];
