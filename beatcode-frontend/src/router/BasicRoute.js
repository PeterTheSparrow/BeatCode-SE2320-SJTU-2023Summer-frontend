import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OJMainView from '../view/OJMainView';
import { history } from '../utils/history'
import LoginView from "../view/LoginView";
import {ProblemSet} from "../components/MainScene/ProblemSet";
import SingleProblem from "../components/MainScene/SingleProblem";
import RankingBoard from "../components/MainScene/RankingBoard";
import AllSubmissions from "../components/MainScene/AllSubmissions";
import PersonalInfo from "../components/MainScene/PersonalInfo";
import SingleSubmission from "../components/MainScene/SingleSubmission";
import RegisterView from "../view/RegisterView";
import OJAdminView from "../view/OJAdminView";
import ProblemSetAdmin from "../components/AdminScene/ProblemSetAdmin";
import EditSingleProblem from "../components/AdminScene/EditSingleProblem";
import RouteGuard from "./RouteGuard";
import AddSingleProblem from "../components/AdminScene/AddSingleProblem";
import PersonalRecord from "../components/MainScene/PersonalRecord";
import ErrorPage from "../components/MainScene/ErrorPage";
import ProblemSubmissions from "../components/MainScene/ProblemSubmissions";

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
        <Router history = {history}>
            <Routes>
                {/*这里使用了路由守卫来鉴权*/}
                <Route
                    path={"/"}
                    element={<RouteGuard element={OJMainView } currURL={"/"}  />
                    } >
                    <Route path={"/"} element={<ProblemSet />} />
                    <Route path={"/ranking-board"} element={<RankingBoard />} />
                    <Route path={"/submissions/:searchRegex?"} element={<AllSubmissions />} />
                    <Route path={"/personal-info"} element={<PersonalInfo />} />
                    <Route path={"/problem/:id"} element={<SingleProblem />} />
                    <Route path={"/problem-info/:id"} element={<ProblemSubmissions />} />
                    <Route path={"/submission/:id"} element={<SingleSubmission />} />
                    <Route path={"/PersonalRecord"} element={<PersonalRecord />} />
                </Route>


                <Route
                    path={"/admin"}
                    element={<RouteGuard element={OJAdminView } currURL={"/admin"}  />
                    } >
                    {/*/!*管理员独有的：ProblemSetAdmin、EditSingleProblem（修改某道题目的信息）*!/*/}
                    <Route path={"/admin"} element={<ProblemSetAdmin />} />
                    <Route path={"/admin/edit-problem/:id"} element={<EditSingleProblem />} />
                    <Route path={"/admin/add-problem"} element={<AddSingleProblem />} />

                    {/*/!*下面这些组件全部是普通用户和管理员共用的*!/*/}
                    <Route path={"/admin/ranking-board"} element={<RankingBoard />} />
                    <Route path={"/admin/submissions"} element={<AllSubmissions />} />
                    <Route path={"/admin/personal-info"} element={<PersonalInfo />} />
                    <Route path={"/admin/problem/:id"} element={<SingleProblem />} />
                    <Route path={"/admin/submission/:id"} element={<SingleSubmission />} />
                    <Route path={"/admin/PersonalRecord"} element={<PersonalRecord />} />
                    <Route path={"/admin/problem-info/:id"} element={<ProblemSubmissions />} />
                </Route>


                <Route path= {"/login"} element={<LoginView />} />
                <Route path={"/register"} element={<RegisterView />} />
                <Route path={"/error"} element={<ErrorPage />} />


                {/*将所有未匹配到其他路由的路径都重定向到根路径，
                以确保用户在访问不存在的路径时能够正确导航到主页或其他指定的路径。*/}
                {/*BUG 这里怎么区分用户和管理员*/}
                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default BasicRoute;
