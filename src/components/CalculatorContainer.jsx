import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import FeedbackDisplayContainer from '../containers/FeedbackDisplayContainer'
import KeyboardAndDisplay from './Keyboard'
import GraphicContainer  from '../containers/GraphicContainer'
import ProjectHeader from './ProjectHeader'
import lib from '../lib/lib'

const CalculatorContainer = () => (

    <Grid container stacked divided columns={2}>

      <Grid.Row stretched >
          <ProjectHeader/>
      </Grid.Row>
      <Grid.Row stretched >
        <Grid.Column>
          <Segment>
            <FeedbackDisplayContainer />
          </Segment>
          <Segment>
            <KeyboardAndDisplay/>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <GraphicContainer />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>

)

export default CalculatorContainer;
