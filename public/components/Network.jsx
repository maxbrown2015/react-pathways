import React from 'react';
import Flexbox from 'flexbox-react';
import Graph from 'react-graph-vis';
import * as actions from '../actions/index.js';



const networkOptions = {
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -50,
      springLength: 500,
      springConstant: 0.9,
      centralGravity: .01,
      avoidOverlap: .0000001,
    }
  },
  edges: {
    arrows: {
      to: {
        enabled: false,
      }
    },
    smooth: true,
  },
  interaction: {
    dragNodes: false,
    dragView: false,
    zoomView: false,
    keyboard: false,
    selectConnectedEdges: false,
  }
}

const events = {
  select: function(event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
  }
};


class Network extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      network: {
        on: function(){}
      }
    }
    this.setListeners = this.setListeners.bind(this);

  }

  setListeners() {

    this.state.network.on('selectNode', (event) => {
      let connectedNodes = new Set([event.nodes[0]]);
      let connectedEdges = new Set(this.state.network.getConnectedEdges(event.nodes[0]));

      console.log(connectedNodes);
      console.log(connectedEdges);
      
      let nodeQueue = [event.nodes[0]];
      let visited = {};


      while (nodeQueue.length != 0) {

        const currNode = nodeQueue.pop();
        visited[currNode] = true;
        const connected = this.state.network.getConnectedNodes(currNode);
        connected.forEach((node) => {
          if (visited[node]) return;

          connectedNodes.add(node);
          nodeQueue.push(node);
        
          let adjacent = this.state.network.getConnectedEdges(node);
          adjacent.forEach((edge) => {
            connectedEdges.add(edge);
          });
        });
       // 
      }


      let connectedEdgeArray = [];
      connectedEdges.forEach((edge) => connectedEdgeArray.push(edge));
      this.state.network.selectEdges(connectedEdgeArray);

      console.log(connectedNodes);
      console.log(connectedEdges);

      this.props.store.dispatch(actions.nodeSelect(connectedNodes, event.nodes[0]));
    });
  };

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  render() {
    console.log('network rendered');
   // console.log(this.state.network);
    return  <Graph graph={this.props.store.getState().graph} options={networkOptions} 
    getNetwork={network =>
      this.setState({network}, function() {
        this.setListeners();
      })}/>
  }

}

export default Network;