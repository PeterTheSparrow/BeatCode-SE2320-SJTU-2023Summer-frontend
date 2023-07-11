import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import OJMainView from '../view/OJMainView';
import { history } from '../utils/history'
import LoginView from "../view/LoginView";
import { ProblemSet } from "../components/MainScene/ProblemSet";
import SingleProblem from "../components/MainScene/SingleProblem";
import RankingBoard from "../components/MainScene/RankingBoard";
import AllSubmissions from "../components/MainScene/AllSubmissions";
import PersonalInfo from "../components/MainScene/PersonalInfo";
import SingleSubmission from "../components/MainScene/SingleSubmission";
import RegisterView from "../view/RegisterView";
import OJAdminView from "../view/OJAdminView";
import ProblemSetAdmin from "../components/AdminScene/ProblemSetAdmin";
import EditSingleProblem from "../components/AdminScene/EditSingleProblem";
import PrivateRoute from "./PrivateRoute";

const BasicRoute = () => {
    useEffect(() => {
        const unsubscribe = history.listen((location, action) => {
            console.log(location, action);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/">
                    <OJMainView>
                        <Route exact path="/" component={ProblemSet} />
                        <Route exact path="/ranking-board" component={RankingBoard} />
                        <Route exact path="/my-submissions" component={AllSubmissions} />
                        {/*<PrivateRoute exact path="/personal-info" component={PersonalInfo} />*/}
                        <Route exact path="/personal-info" component={PersonalInfo} />
                        <Route exact path="/problem/:id" component={SingleProblem} />
                        <Route exact path="/submission/:id" component={SingleSubmission} />
                    </OJMainView>
                </PrivateRoute>

                <Route path="/admin">
                    <OJAdminView>
                        <Route exact path="/admin" component={ProblemSetAdmin} />
                        <Route exact path="/admin/edit-problem/:id" component={EditSingleProblem} />
                        <Route exact path="/admin/ranking-board" component={RankingBoard} />
                        <Route exact path="/admin/my-submissions" component={AllSubmissions} />
                        <Route exact path="/admin/personal-info" component={PersonalInfo} />
                        <Route exact path="/admin/problem/:id" component={SingleProblem} />
                        <Route exact path="/admin/submission/:id" component={SingleSubmission} />
                    </OJAdminView>
                </Route>

                <Route exact path="/login" component={LoginView} />
                <Route exact path="/register" component={RegisterView} />

                <Route path="/*" render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
};

export default BasicRoute;
