import React, {useEffect,Fragment,  useContext} from 'react';

//import logo from './logo.svg';
import './styles.css';

import {Container, Input  } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import  ActivityDashboard  from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from '../../features/nav/navBar';

import { LoadingComponent } from "./LoadingComponent";

import {RootStoreContext  } from "../stores/rootStore";
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { HomePage } from "../../features/Home/HomePage";
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { NotFound } from './NotFound';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LoginForm from '../../features/user/LoginForm';
import RegisterForm from '../../features/user/RegisterForm';
import ModalContainer  from "../../app/common/modals/ModalContainer";


const App : React.FC<RouteComponentProps> = ({location}) => {
  
  const rootStore=useContext(RootStoreContext)
  
  const {loadingInitial,loadActivities}=rootStore.activityStore;
 

  useEffect(()=>{
     //console.log("loading")
     loadActivities()
     //console.log("finished")
  },[loadActivities])

    if(loadingInitial){
      return (
        <LoadingComponent inverted={true} content="loading activities"  />
      )
    }
 
    return (
      <Fragment>
          <ModalContainer />
          <ToastContainer position="bottom-right" />
          <Route  exact path='/' component={HomePage}  />
          <Route  
            path={'/(.+)'} 
            render={()=>(
              <>
              <NavBar />
              <Container style={{marginTop:'7em'}}>
                <Switch>
                  <Route exact
                    path='/activities' component={ActivityDashboard}
                  />
                  <Route
                    path='/activities/:id' component={ActivityDetails}
                  />
                  <Route key={location.key}
                    path={['/create', '/manage/:id']} component={ActivityForm}
                  />
                  <Route path="/login" component={LoginForm} />
                  <Route path="/register" component={RegisterForm} />
                  <Route component={NotFound} />
                </Switch>
            </Container>
            </>
          )} />  
                
      </Fragment>
    )
  
}

export default withRouter(observer(App)) ;
