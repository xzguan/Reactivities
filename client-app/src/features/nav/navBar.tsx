import React from 'react';
import { Menu, Container, Button } from "semantic-ui-react";

import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

interface IProps {
  openCreateForm: ()=>void;
}

const NavBar:React.FC= () => {

    
    return (
        <Menu fixed='top' inverted >
        <Container>
          <Menu.Item header as={NavLink} exact to={"/"}>
              <img src="/assets/logo.png" alt="logo" style={{marginRight:20}}/>
               
          </Menu.Item>
          <Menu.Item as={NavLink} exact to={"/activities"}
            name='Activities'
          />
          <Menu.Item >
            <Button  content="Create Activity"  positive  as={NavLink} exact to="/create"/>
          </Menu.Item>
         
        </Container>
      </Menu>
    )
}
export default observer(NavBar);
