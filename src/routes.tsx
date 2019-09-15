import { Home } from "./Home";
import Axios from "axios";
import { CheckUrl } from "./CheckUrl";
import { Route } from "./Router";

export const routes: {
    [route: string]: {
        component: React.ComponentClass<any, any>;
        prefetch?: ((data?: any) => Promise<any>) | undefined;
    };
} = {
    home: {
        component: Home
    },
    checkUrl: {
        component: CheckUrl,
        prefetch(route: Route) {
            return getJSON(`http://localhost:1337/?url=${encodeURIComponent(route.data.url)}`);
        }
    }
}


function getJSON<T>(url: string) {
    return fetch(url).then(a => a.json());
}