import React from 'react'
import { Header, Image } from 'semantic-ui-react'

const ProjectHeader = () =>
    <Header as='h2'>
        <Image circular src='/assets/images/gime.png' /> 
        <Image circular src='/assets/images/astur.png' /> 
        <Image circular src='/assets/images/mauri.png' /> 
        <Header.Content>
          #M:G:C#          
          <Header.Subheader> Mauri's Graphing Calculator </Header.Subheader>
        </Header.Content>
    </Header>

export default ProjectHeader
