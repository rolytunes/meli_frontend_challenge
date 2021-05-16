import { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";

export default function AppRouter() {
    const LoadingMessage = () => <div>Loading..,</div>;

    return (
            <Suspense fallback={<LoadingMessage />}>
                <Switch>
                    <Route exact path="/api/items/:id" component={ProductDetails}></Route>
                    <Route exact path="/api/items" component={SearchResults}></Route>
                    <Route exact path="/">
                        <Redirect to="/api/items" />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
    );
}
