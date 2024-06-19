import * as React from 'react';
import Box from '@mui/material/Box';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import MainContent from './MainContent/MainContent';

export default function HomePage() {
 

  return (
    <div>
      <NavBar>
      </NavBar>
      <Content>

      </Content>

      <Box width="216px" top="64px" gap="0px" opacity="0px" backgroundColor="#F5F5F5" sx={{height:"100vh", boxSizing:"border-box", position:"fixed", display:"flex", boxSizing:"border-box", overflowY:"auto"}}>
        <SideBar />
      </Box>

      <MainContent></MainContent>



      </div>


  );
}