import React, {useEffect,Fragment,  useContext} from 'react';

//import logo from './logo.svg';
import './styles.css';

import {Container  } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import  ActivityDashboard  from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from '../../features/nav/navBar';

import { LoadingComponent } from "./LoadingComponent";
import  ActivityStore  from "../stores/activityStore";
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { HomePage } from "../../features/Home/HomePage";
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { NotFound } from './NotFound';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App : React.FC<RouteComponentProps> = ({location}) => {
  
  const activeStore=useContext(ActivityStore)
  
  const {loadingInitial,loadActivities}=activeStore;
 

  useEffect(()=>{
     console.log("loading")
     loadActivities()
     console.log("finished")
  },[loadActivities])

    if(loadingInitial){
      return (
        <LoadingComponent inverted={true} content="loading activities"  />
      )
    }
 
    return (
      <Fragment>
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
                  <Route component={NotFound} />
                </Switch>
            </Container>
            </>
          )} />  
                
      </Fragment>
    )
  
}

export default withRouter(observer(App)) ;
