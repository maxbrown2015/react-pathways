import React from 'react';
import Flexbox from 'flexbox-react';
import Graph from 'react-graph-vis';
import * as actions from '../../actions/index.js';

const networkOptions = {
  autoResize: false,
  width: '100%',
  height: '100%',
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -50,
      springLength: 200,
      springConstant: 0.9,
      centralGravity: .02,
      avoidOverlap: .999999,
    },
    solver: 'forceAtlas2Based'
    
  },
  interaction: {
    hoverConnectedEdges: false,
    hover: true,
    dragNodes: false,
    dragView: false,
    zoomView: false,
    keyboard: false,
    selectConnectedEdges: false,
    tooltipDelay: 100
  },
  nodes: {
    shape: 'circle',
    widthConstraint: 45,
    heightConstraint: 45,
    font: {
      size: 20
    }
    /*
    scaling: {
      min: 45,
      max: 45,
      label: {
        enabled: true,
        min: 30,
        max: 30
      }
    }
    */
  },
  edges: {
    arrows: {
      to: {
        enabled: false,
      }
    },
    smooth: true,
  },
}

const events = {
  select: function(event) {
    var { nodes, edges } = event;
  //  console.log("Selected nodes:");
   // console.log(nodes);
  //  console.log("Selected edges:");
   // console.log(edges);
  },//
  hover: function(event) {
    console.log(event);
  }
};


const belongsToPathway = (courses, root, edge) => {
  return courses[root].selectedPathways.includes(edge.pathway);
}


class Network extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      network: {
        on: function(){}
      }
    }
    this.setListeners = this.setListeners.bind(this);
    this.onCourseSelect = this.onCourseSelect.bind(this);

  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('network - updated');
    const reduxStateUpdateOptions = this.props.store.getState().selectionUpdateOptions;
    const selected = this.props.store.getState().selected;
    console.log(reduxStateUpdateOptions);
    if (reduxStateUpdateOptions.networkSelect) {
      console.log('network selection'); 
      this.onCourseSelect(selected);
      this.props.store.dispatch(actions.resetSelectionOptions());
    }

    if (reduxStateUpdateOptions.catalogSelect) {
      console.log('catalog selection'); 
      this.onCourseSelect(selected);
      this.props.store.dispatch(actions.resetSelectionOptions());
    }

    if (reduxStateUpdateOptions.legendSelect) {
      const activePathway = this.props.store.getState().activePathways[0];
      console.log(activePathway);
      this.onLegendSelect(activePathway);
    }

    if (reduxStateUpdateOptions.searchSelect) {
      this.onCourseSelect(selected);
      this.props.store.dispatch(actions.resetSelectionOptions());
    }
  }


  onLegendSelect(pathway) {
    const edges = this.props.store.getState().graph.edges;
    // console.log(edges);
    
    const pathwayEdges = Object.keys(edges).filter((key) => {
      const edge = edges[key];
      return (edge.pathway === pathway);
    });
  
    this.state.network.setOptions({ edges: { selectionWidth: 0 } });
    this.state.network.selectEdges(pathwayEdges);
    this.boldSelectedEdges(); 
  }


  onCourseSelect(selected) {
    console.log(selected);
    
    const courses = this.props.store.getState().courses;
    const graph = this.props.store.getState().graph;

    const root = selected;
    let connectedNodes = new Set([root]);
    let connectedEdges = new Set(this.state.network.getConnectedEdges(root));
    
    let nodeQueue = [root];
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
          const edgeObject = graph.edges[edge];
          if (belongsToPathway(courses, root, edgeObject)) {
            connectedEdges.add(edge);
          }
        });
      });
    }


    let connectedEdgeArray = [];
    connectedEdges.forEach((edge) => connectedEdgeArray.push(edge));
    this.state.network.setOptions({ edges: { selectionWidth: 0 } });

    this.state.network.setSelection({
     //  nodes: [selected],
      edges: connectedEdgeArray
    });
    
    this.boldSelectedEdges();

    console.log(courses[Number(selected)]);
    this.props.store.dispatch(actions.buildCatalog(connectedNodes));
    this.props.store.dispatch(actions.setActivePathways(courses[Number(root)].selectedPathways));
  }

  boldSelectedEdges() {
    for (let i = 0; i < 5; i += 0.01) {
      setTimeout(() => {
        this.state.network.setOptions({
          edges: { selectionWidth: i},
        });
      }, 30 * i);
    }
  }

  setListeners() {
    this.state.network.on('selectNode', (event) => {
      console.log('node - selected');
      this.props.store.dispatch(actions.networkSelect(event.nodes[0]));
    });

    this.state.network.on('selectEdge', (event) => {
      console.log('edge - selected');
      const edgeObj = this.props.store.getState().graph.edges[event.edges[0]];
      console.log(event);
      this.props.store.dispatch(actions.legendSelect(edgeObj.pathway));
    });

    this.state.network.on('hoverNode', () => {
      document.body.style.cursor = "pointer";
    });

    this.state.network.on('blurNode', () => {
      document.body.style.cursor = "auto";
    });
  };

  render() {
    console.log('network rendered');
   // console.log(this.state.network);
    return  <Graph graph={this.props.store.getState().graph} options={networkOptions} events={events}
    getNetwork={network =>
      this.setState({network}, function() {
        this.setListeners();
      })}/>
  }
}

export default Network;