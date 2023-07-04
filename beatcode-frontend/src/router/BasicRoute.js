import React, { useEffect } from 'react';
// import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OJMainView from '../view/OJMainView';
// import PrivateRoute from './PrivateRoute';
// import LoginRoute from './LoginRoute';
// import HomeView from './view/HomeView';
// import LoginView from './view/LoginView';
import { history } from '../utils/history'
import LoginView from "../view/LoginView";
// import BookView from './view/BookView';
import {ProblemSet} from "../components/MainScene/ProblemSet";
import SingleProblem from "../components/MainScene/SingleProblem";
import RankingBoard from "../components/MainScene/RankingBoard";
import MySubmission from "../components/MainScene/MySubmission";
import PersonalInfo from "../components/MainScene/PersonalInfo";
import SingleSubmission from "../components/MainScene/SingleSubmission";
import RegisterView from "../view/RegisterView";

/**
 * @Description: 路由配置
 * @Author: peterTheSparrow
 * @Date: 2023/06/30
 * */
const BasicRoute = () => {
    useEffect(() => {
        const unsubscribe = history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Router>
            <Routes>
                {/*这里暂时先不使用权限检查，因此先实现最基础的路由*/}
                <Route path="/" element={<OJMainView />}>
                {/*让一些component成为OJMainView的子组件*/}
                    <Route path={"/"} element={<ProblemSet />} />
                    <Route path={"/ranking-board"} element={<RankingBoard />} />
                    <Route path={"/my-submissions"} element={<MySubmission />} />
                    <Route path={"/personal-info"} element={<PersonalInfo />} />
                    <Route path="/problem/:id" element={<SingleProblem />} />
                    <Route path={"/submission/:id"} element={<SingleSubmission />} />
                </Route>
                <Route path= "/login" element={<LoginView />} />
                <Route path={"/register"} element={<RegisterView />} />

                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default BasicRoute;

// 陈昊鹏的路由配置
// const BasicRoute = () => {
//     useEffect(() => {
//         const unsubscribe = history.listen((location, action) => {
//             // clear alert on location change
//             console.log(location, action);
//         });
//
//         return () => {
//             unsubscribe();
//         };
//     }, []);
//
//     return (
//         <Router history={history}>
//             <Switch>
//                 {/*<PrivateRoute exact path="/" component={OJMainView} />*/}
//                 <Route exact path="/" component={OJMainView} />
//                 {/*这里暂时先不涉及到权限检查，先用最基础的路由*/}
//                 {/*<PrivateRoute exact path="/" component={HomeView} />*/}
//                 {/*<LoginRoute exact path="/login" component={LoginView} />*/}
//                 {/*<PrivateRoute exact path="/bookDetails" component={BookView} />*/}
//                 <Redirect from="/*" to="/" />
//             </Switch>
//         </Router>
//     );
// };
//
// export default BasicRoute;
