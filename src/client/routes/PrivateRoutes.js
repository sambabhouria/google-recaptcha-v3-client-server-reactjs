import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from '../resources/slugs';
import LoadingComponent from '../components/loading';
import {Recaptcha, RecaptchaV1, RecaptchaV2, RecaptchaV3} from "../components/recaptcha";

const DashboardComponent = lazy(() => import('./dashboard'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.tickets} render={() => <RecaptchaV1 />} />
                <Route exact path={SLUGS.contacts} render={() => <RecaptchaV2 />} />
                <Route exact path={SLUGS.subscription} render={() => <RecaptchaV3 /> } />
                <Route exact path={SLUGS.agents} render={() => <Recaptcha /> } />

                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
