import {
  faDashboard,
  faFileDownload,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ClientNavigation } from "../../core/interfaces/dashboard-client-links.interface";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export const clientDashboardActions: ClientNavigation[] = [
  {
    name: "Kontrolna tabla",
    icon: faDashboard,
  },
  {
    name: "Sačuvane knjige",
    icon: faHeart,
  },
  {
    name: "Preuzete knjige",
    icon: faFileDownload,
  },
  {
    name: "Informacije o nalogu",
    icon: faUser,
  },
  {
    name: "Odjavi se",
    icon: faSignOut,
  },
];
