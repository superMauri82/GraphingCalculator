import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import FeedbackDisplayContainer from '../containers/FeedbackDisplayContainer'
import KeyboardContainer from '../containers/KeyboardContainer'
import GraphicContainer  from '../containers/GraphicContainer'
import ProjectHeader from './ProjectHeader'
import lib from '../lib/lib'
import { Provider } from 'react-redux'

import storeFactory from '../store/storeFactory'

const store = storeFactory()

const CalculatorMainGrid = () => (
  <Provider store={store}>
    <Grid container stacked divided columns={2}>
      <Grid.Row stretched >
          <ProjectHeader />
      </Grid.Row>
      <Grid.Row stretched >
        <Grid.Column>
          <Segment>
            <FeedbackDisplayContainer />
          </Segment>
          <Segment>
            <KeyboardContainer />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <GraphicContainer />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Provider>

)

export default CalculatorMainGrid;
